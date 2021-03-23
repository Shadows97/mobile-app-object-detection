import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 TextInput,
 Image,
 ScrollView,
 TouchableHighlight,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {RootNavigation} from './src/navigation/navigation';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

class Registration extends Component {
 constructor(props) {
   super(props);
   this.state = {
    
   };
 }
 
 
 render() {
   if (this.state.image !== '') {
   }
   return (
     <>
     <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootNavigation/>
        </NavigationContainer>    
     </ApplicationProvider>
     </>
   );
 }
}
 
const styles = StyleSheet.create({
 TextInputStyleClass: {
   textAlign: 'center',
   marginBottom: 7,
   height: 40,
   borderWidth: 1,
   marginLeft: 90,
   width: '50%',
   justifyContent: 'center',
   borderColor: '#D0D0D0',
   borderRadius: 5,
 },
 inputContainer: {
   borderBottomColor: '#F5FCFF',
   backgroundColor: '#FFFFFF',
   borderRadius: 30,
   borderBottomWidth: 1,
   width: 300,
   height: 45,
   marginBottom: 20,
   flexDirection: 'row',
   alignItems: 'center',
 },
 buttonContainer: {
   height: 45,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 20,
   width: '80%',
   borderRadius: 30,
   marginTop: 20,
   marginLeft: 5,
 },
 captureButton: {
   backgroundColor: '#337ab7',
   width: 350,
 },
 buttonText: {
   color: 'white',
   fontWeight: 'bold',
 },
 horizontal: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   padding: 10,
 },
 submitButton: {
   backgroundColor: '#C0C0C0',
   width: 350,
   marginTop: 5,
 },
 imageholder: {
   borderWidth: 1,
   borderColor: 'grey',
   backgroundColor: '#eee',
   width: '50%',
   height: 150,
   marginTop: 10,
   marginLeft: 90,
   flexDirection: 'row',
   alignItems: 'center',
 },
 previewImage: {
   width: '100%',
   height: '100%',
 },
});
 
export default Registration;