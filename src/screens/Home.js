import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 TextInput,
 Image,
 ScrollView,
 Dimensions,
 TouchableOpacity
} from 'react-native';
import 'react-native-gesture-handler';
import { Text , Button, Modal, Card, Icon, Spinner} from '@ui-kitten/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Amplify, {API} from 'aws-amplify';
import { RNS3 } from 'react-native-aws3';
import { PATH, API_CONFIG, API_NAME, OPTIONS } from '../constant';
 
// Amplify configuration for API-Gateway
Amplify.configure({
 API: {
   endpoints: [API_CONFIG],
 },
});


 
class Home extends Component {
 constructor(props) {
   super(props);
   this.state = {
     username: '',
     userId: '',
     image: '',
     capturedImage: '',
     objectName: '',
     file: {},
     visibleModal: false,
     isload: false
   };
 }
 
// It selects image from filesystem or capture from camera
 cameraImageButtonHandler = () => {
   this.setState({
     objectName: '',
     visibleModal: false
   });
 
   launchCamera(
     {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
     response => {
       console.log('Response = ', response);
       if (response.didCancel) {
         console.log('User cancelled image picker');
       } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       } else {
         // You can also display the image using data:
         const source = {uri: encodeURIComponent(response.uri)}; 
         const file = {
          uri: response.uri,
          name: response.fileName,
          type: "image/jpg"
        }
        this.setState({
          capturedImage: response.uri,
          base64String: source.uri,
          username: "uploads/" + response.fileName,
          file: file
        });
       
         
       }
     },
   );
 };

 storageImageButtonHandler = () => {
    this.setState({
      objectName: '',
      visibleModal: false
    });
  
    launchImageLibrary(
      {title: 'Pick an Image'},
      response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          const source = {uri: encodeURIComponent(response.uri)}; 
          const file = {
           uri: response.uri,
           name: response.fileName,
           type: "image/jpg"
         }
         this.setState({
           capturedImage: response.uri,
           base64String: source.uri,
           username: "uploads/" + response.fileName,
           file: file
         });
        
          
        }
      },
    );
  };
 
// this method triggers when you click submit. If the image is valid then It will send the image to API Gateway. 
 submitButtonHandler = async () => {
   if (
     this.state.capturedImage == '' ||
     this.state.capturedImage == undefined ||
     this.state.capturedImage == null
   ) {
     alert('Please Capture the Image');
   } else {
    this.setState({
      isload: true
    });
     const init = {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/x-amz-json-1.1',
       },
       body: {
         Image: this.state.base64String,
         name: this.state.username,
       },
     };
     RNS3.put(this.state.file, OPTIONS).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
      API.post(API_NAME, PATH, init).then(response => {
        console.log(response)
        if (JSON.stringify(response.Labels.length) > 0) {
          this.setState({
            objectName: response.Labels[0].Name,
            isload: false
          });
        } else {
          alert('Please Try Again.');
        }
      }).catch(erro => console.log(erro));
    });

     
     
   }
 };

 showModal = () => {
    console.log("object")
    this.setState(
        {
            visibleModal: true
        }
        )
}
 
 render() {
   if (this.state.image !== '') {
   }
   return (
     <View style={styles.MainContainer}>
       <ScrollView>
         
         <Text
           style={{
             fontSize: 20,
             color: '#000',
             textAlign: 'center',
             marginBottom: 15,
             marginTop: 10,
           }}>
           Capture Image
         </Text>
         {this.state.capturedImage !== '' && (
           <View style={styles.imageholder}>
             <Image
               source={{uri: this.state.capturedImage}}
               style={styles.previewImage}
             />
           </View>
         )}
         
         {this.state.isload ?(<View style={styles.spinner}>
         <Spinner />
         </View>) : null}
         {this.state.objectName  ? (
           <TextInput
             underlineColorAndroid="transparent"
             style={styles.TextInputStyleClass}
             value={this.state.objectName}
           />
         ) : null}
         <Button
           style={[styles.buttonContainer, styles.captureButton]}
           onPress={this.showModal}>
           <Text style={styles.buttonText}>Capture Image</Text>
         </Button>
 
         <Button
           style={[styles.buttonContainer, styles.submitButton]}
           onPress={this.submitButtonHandler}>
           <Text>Submit</Text>
         </Button>
       </ScrollView>

       <Modal
       style={styles.modal}
        visible={this.state.visibleModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => this.setState({visibleModal: false})}>
        <Card disabled={true} style={styles.cardContainer}>
            <Text>Select image from</Text>
            <View style={styles.card}>
            <TouchableOpacity 
            style={{marginLeft: 15}}
            onPress={() => this.storageImageButtonHandler()}
            >
                <View 
                style={styles.iconContainer}
                
                >
                <Icon
                    style={styles.icon}
                    fill='#FFFFFF'
                    name='image-outline'
                    />
                </View>
               
                <Text>Gallery</Text>

            </TouchableOpacity>
            <TouchableOpacity  
            style={{marginLeft: 15}}
            onPress={() => this.cameraImageButtonHandler()}
            >
                <View style={styles.iconContainer}>
                <Icon
                    style={styles.icon}
                    fill='#FFFFFF'
                    name='camera-outline'
                    />
                </View>
                
                <Text>Camera</Text>
            </TouchableOpacity>
        
            </View>
           
        </Card>
         
       
      </Modal>

     </View>

   );
 }
}
 
const styles = StyleSheet.create({
 TextInputStyleClass: {
   textAlign: 'center',
   marginBottom: 7,
   marginTop: 7,
   height: 40,
   borderWidth: 1,
   width: Dimensions.get('screen').width/1.7,
   justifyContent: 'center',
   borderColor: '#D0D0D0',
   borderRadius: 5,
   color: 'black'
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
   width: Dimensions.get('screen').width/1.7,
   borderRadius: 10,
   marginTop: 20,
   marginLeft: 5,
 },
 captureButton: {
   backgroundColor: '#05676D',
   borderColor: "#05676D"
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
   backgroundColor: '#FFFFFF',
   marginTop: 5,
   borderColor: "#FFFFFF"
 },
 imageholder: {
   borderWidth: 1,
   borderColor: 'grey',
   backgroundColor: '#eee',
   width: Dimensions.get('screen').width/1.7,
   height: Dimensions.get('screen').width/3,
   marginTop: 10,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center'
 },
 previewImage: {
   width: '100%',
   height: '100%',
   borderRadius: 5
 },
 MainContainer: {
        flex: 1,
        alignItems: 'center'
 },
 backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    width: 32,
    height: 32,
  },
  card: {
      flexDirection: 'row',
      width: Dimensions.get('screen').width/1.7,
      height: Dimensions.get('screen').width/4,
      marginTop: 10
  },
  iconContainer: {
    backgroundColor: '#05676D',
    width: 50,
    height: 50,
    
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
 
});
 
export default Home;