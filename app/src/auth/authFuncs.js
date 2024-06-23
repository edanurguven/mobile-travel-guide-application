import auth from '@react-native-firebase/auth';

const signUpFunc = async (email, password) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('signUpFunc response : ', response);
    return true; //({result:true});
  } catch (error) {
    console.log('Sign up func error:', error);
    return false; //({result:false,error:error.code})
  }
};

const signInFunc = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    console.log('signInFunc response:', response);
    return true;
  } catch (error) {
    console.log('sign in error : ', error);
    return false;
  }
};

const signOutFunc = async () => {
  try {
    const response = await auth().signOut();
    console.log('RESPONSE : ', response);
    return true;
  } catch (error) {
    return false;
  }

  /*
    auth().signOut()
     .then((response)=>{
        console.log("SignOutFunc Response : ", response)
      })
      .catch((err)=>{
        console.log(err);
      })  */
};

const checkOutFunc = () => {
  const user = auth().currentUser;
  console.log(user);
  return user;
};

const deleteUser = async () => {
  const user = auth().currentUser;
  try {
    await user.delete();
    console.log('user deleted');
  } catch (error) {
    console.log('user delete error :', error);
  }
};

export default {signInFunc, signOutFunc, signUpFunc, checkOutFunc, deleteUser};
