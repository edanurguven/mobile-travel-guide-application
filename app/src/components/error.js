import React from 'react';
import LottieView from 'lottie-react-native';
import {View, Text} from 'react-native';

function ErrorViewer({message = ''}) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <LottieView
        style={{flex: 3}}
        source={require('../../assets/lotties/errorA.json')}
        autoPlay
      />
      <View style={{justifyContent: 'center', flex: 2}}>
        <Text style={{color: '#130f40', fontSize: 20, textAlign: 'center'}}>
          {message}
        </Text>
      </View>
    </View>
  );
}
export default ErrorViewer;
