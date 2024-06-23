import React from 'react';

export default function reducers(state, actions) {
  switch (actions.type) {
    case 'add_username':
      const {name} = actions.payload;
      return {...state, userName: name};

    case 'add_email':
      const {email} = actions.payload;
      return {...state, email: email};

    case 'update_distance':
      const {distance} = actions.payload;
      return {...state, distance: distance};

    case 'update_favorites':
      const {favorites} = actions.payload;
      return {...state, favorites: favorites};

    case 'update_placeTypes':
      const {placeTypes} = actions.payload;
      return {...state, placeTypes: placeTypes};

    case 'update_lat':
      const {lat} = actions.payload;
      return {...state, lat: lat};
    case 'update_lon':
      const {lon} = actions.payload;
      return {...state, lon: lon};
    case 'update_saved':
      const {saved_list} = actions.payload;
      return {...state, saved_list: saved_list};
    default:
      return state;
  }
}
