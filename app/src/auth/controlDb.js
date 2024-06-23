import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const usersCollection = firestore().collection('users');
const placeCollection = firestore().collection('comments');

const addUserDbPlace = async (username, email, favorites, saved) => {
  try {
    await usersCollection.doc(email).set({
      name: username,
      favorites: favorites,
      saved: saved,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const getUserName = async email => {
  try {
    const userName = await usersCollection.doc(email).get();
    return userName.data().name;
  } catch (error) {
    return 0;
  }
};

const getUser = async email => {
  try {
    const user = await usersCollection.doc(email).get();
    return user;
  } catch (error) {
    return 0;
  }
};

const getFavorites = async email => {
  try {
    const user = await usersCollection.doc(email).get();
    const favorites = user.data().favorites
      ? user.data().favorites.split(',')
      : [];
    return favorites;
  } catch (error) {
    return 0;
  }
};

const addFavorite = async (placeId, email) => {
  try {
    const result = await oneOfFavorites(placeId, email);
    if (result) {
      null;
    } else {
      const array = await getFavorites(email);
      array.push(placeId);
      await usersCollection.doc(email).update({
        favorites: array.join(','),
      });
    }
  } catch (error) {
    return 0;
  }
};

const deleteFromFavorites = async (placeId, email) => {
  try {
    const array = await getFavorites(email);
    const newArray = array.filter(id => id !== String(placeId));
    await usersCollection.doc(email).update({
      favorites: newArray.join(','),
    });
  } catch (error) {
    return 0;
  }
};

const oneOfFavorites = async (placeId, email) => {
  try {
    const favorites = await getFavorites(email);
    const result = favorites.find(id => id === String(placeId));
    return result;
  } catch (error) {
    return 0;
  }
};

const getSaved = async email => {
  try {
    const user = await usersCollection.doc(email).get();
    const saved = user.data().saved;
    return saved; //return array
  } catch (error) {
    return 0;
  }
};

const isThereInArray = async (placeId, email) => {
  try {
    const items = await getSaved(email);
    const result = items.find(id => id === placeId);
    return result;
  } catch (error) {
    return 0;
  }
};

const addSaved = async (placeId, email) => {
  try {
    const result = await isThereInArray(placeId, email);
    if (result) {
      null;
    } else {
      const array = await getSaved(email);
      array.push(placeId);
      await usersCollection.doc(email).update({
        saved: array,
      });
    }
  } catch (error) {
    return 0;
  }
};

const deleteFromSaved = async (placeId, email) => {
  try {
    const array = await getSaved(email);
    const newArray = array.filter(id => id !== placeId);
    await usersCollection.doc(email).update({
      saved: newArray,
    });
  } catch (error) {
    return;
  }
};

const getPoint = async placeId => {
  try {
    const id = String(placeId);
    const place = await placeCollection.doc(id).get();
    if (place.exists) {
      return place.data().Point;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

const getParticipants = async placeId => {
  try {
    const id = String(placeId);
    const place = await placeCollection.doc(id).get();
    if (place.exists) {
      return place.data().NumberOfParticipants;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

const addPoint = async (placeId, getPointValue) => {
  try {
    const peopleCount = await getParticipants(placeId);
    const point = await getPoint(placeId);
    const newPoint = (point * peopleCount + getPointValue) / (peopleCount + 1);

    const id = String(placeId);
    await placeCollection.doc(id).update({
      NumberOfParticipants: peopleCount + 1,
      Point: newPoint,
    });
  } catch (error) {
    return 0;
  }
};

const getTopPlaces = async () => {
  try {
    const snapshot = await placeCollection
      .orderBy('Point', 'desc') // 'Point' alanına göre azalan sıralama
      .limit(10) // İlk 10 sonucu almak
      .get();
    /*

    const topPlaces = snapshot.docs.map(doc => ({
      id: doc.id, // Döküman ID'si
      ...doc.data(), // Dökümanın verileri
    }));  */

    const topPlaceIds = snapshot.docs.map(doc => doc.id);

    return topPlaceIds;
  } catch (error) {
    console.error('Hata oluştu: ', error);
    return [];
  }
};

export default {
  addUserDbPlace,
  getUserName,
  getFavorites,
  addFavorite,
  deleteFromFavorites,
  oneOfFavorites,
  getUser,
  getSaved,
  addSaved,
  deleteFromSaved,
  isThereInArray,
  getPoint,
  getParticipants,
  addPoint,
  getTopPlaces,
};
