import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Button} from '@rneui/themed';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import placeTypes from '../../models/placeTypes';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const SettingScreen = props => {
  const navigation = props.navigation;

  const [placeType, setPlaceType] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distance, setDistance] = useState(1);
  let [errorMessage, setErrorMessage] = useState('');
  const distanceState = useSelector(selector => selector.distance);
  const dispatch = useDispatch();

  return (
    <LinearGradient colors={['#87bfff', '#ced0ce']} style={{flex: 1}}>
      <View style={style.body}>
        <View style={style.container}>
          <Input
            placeholder={`${distanceState}`}
            keyboardType="numeric"
            onChangeText={value => {
              setDistance(value);
              console.log('distance :', value);
            }}
          />
        </View>
        <View style={style.footer}>
          <View style={style.multiSelected}>
            <SectionedMultiSelect
              items={placeTypes}
              IconRenderer={Icon}
              uniqueKey="name"
              onSelectedItemsChange={setSelectedItems}
              selectedItems={selectedItems}
              searchPlaceholderText="Place Select"
            />
          </View>
        </View>
        <View style={style.buttonView}>
          <Button
            title="Yer Ara"
            loading={false}
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={style.buttonStyle}
            titleStyle={style.titleStyle}
            containerStyle={style.containerStyle}
            onPress={() => {
              if (distance > 0) {
                console.log('Selected items settingScreen : ', selectedItems);
                dispatch({
                  type: 'update_placeTypes',
                  payload: {placeTypes: selectedItems},
                });
                dispatch({
                  type: 'update_distance',
                  payload: {distance: distance},
                });
                console.log('setting screen geldi...');
                navigation.navigate('PlaceOffers', {
                  distance: distance,
                  selectedItems: selectedItems,
                });
              }
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SettingScreen;

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    margin: 30,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  buttonStyle: {
    backgroundColor: '#3433E2', //'rgba(111, 202, 186, 1)',
    borderRadius: 5,
  },
  containerStyle: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  errorStyle: {
    color: '#192a56',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  multiSelected: {
    width: 250,
  },
  buttonView: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
