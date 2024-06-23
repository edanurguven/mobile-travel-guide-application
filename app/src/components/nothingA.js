import React from 'react';
import LottieView from 'lottie-react-native';

function Nothing (){
    return <LottieView style={{ width: 150, height: 150 }}  source={require("../../assets/lotties/nothingA.json")} autoPlay />
}
export default Nothing;