import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as yup from 'yup';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.

import { showMessage, hideMessage } from "react-native-flash-message";
// import { Constants, ImagePicker } from 'expo';
import FlashMessage from "react-native-flash-message";
import axios from '../instances/instance';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import baseURL from '../instances/baseUrl';


export const Driver = ({ route }) => {
    console.log(route)
    const { id } = route.params;
    const [error, setError] = useState('');

    const [driver, setDriver] = useState({});
    useEffect(() => {
        loadDriver();
    }, [id]);

    const loadDriver = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get(`/driver-detail/${id}`, {
                headers: {
                    'token': userAge
                }
            });
            setDriver(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }
    console.log(driver);


    return (

        <ScrollView style={StyleSheet.scroll}>
            <View style={styles.container}>

                <Text h1 style={styles.heading}>Driver Details</Text>

                <Text style={styles.innerhead}>Driver Name</Text>
                <TextInput
                    style={styles.input}
                    value={driver.name}
                    editable={false}

                />

                <Text style={styles.innerhead}>Driver License Number</Text>
                <TextInput
                    style={styles.input}
                    value={driver.liscence_number}
                    editable={false}

                />

                <Text style={styles.innerhead}>Driver Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={driver.driver_number}
                    editable={false}

                />

                <Text h1 style={styles.heading}>License Image</Text>
                <Image source={{ uri: `${baseURL}/${driver.image}` }} style={{ width: 200, height: 200 }} />

            </View>
        </ScrollView>
    );
};


export const HomeScreen = ({ navigation }) => {
    const [driver, setDriver] = useState([]);
    useEffect(() => {
        navigation.addListener('focus', () => {
            loadDriver();
        });
    }, [navigation]);
    const loadDriver = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/driver', {
                headers: {
                    'token': userAge
                }
            });
            setDriver(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }
    return (
        <ScrollView>
            <View style={styles.container2}>
                {
                    driver.map(item => {
                        return (
                            <Card style={{ marginBottom: 13 }} key={item.id} onPress={() => navigation.navigate('Driver Details', { id: item.id })} key={item.id}>
                                <Card.Title title="Driver " />
                                <Card.Content>
                                    <Paragraph>
                                        Name: {item.name} {"\n"}
                                        License No.: {item.liscence_number}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                </Card.Actions>
                            </Card>
                        )
                    })
                }

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button

                        title="add driver details"
                        onPress={() => navigation.navigate('Driver')}
                    />
                </View>
            </View></ScrollView>
    );
}

export function addDriverdetails() {
    const [token, setToken] = useState('');
    const [img, setImg] = useState('');
    const [photo, setPhoto] = useState(null);
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState();
    const [imgErr, setImgErr] = useState('');

    useEffect(() => {
        readData();
    }, []);

    // const pickDocument = async () => {
    //     let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
    //         if (response.type == 'success') {
    //             let { name, size, uri } = response;
    //             let nameParts = name.split('.');
    //             let fileType = nameParts[nameParts.length - 1];
    //             var fileToUpload = {
    //                 name: name,
    //                 size: size,
    //                 uri: uri,
    //                 type: "application/" + fileType
    //             };
    //             console.log(fileToUpload, '...............file')
    //             setImg(fileToUpload);
    //         }
    //     });
    //     // console.log(result);
    //     console.log("Doc: " + img.uri);
    // }

    const submitHandler = async (values) => {
        console.log('img', img);
        const validation = validate(img);
        console.log(validation)
        if (!validation) {
            try {
                const formData = new FormData();
                formData.append('name', values.name)
                formData.append('liscence_number', values.liscence_number)
                formData.append('driver_number', values.driver_number)
                formData.append('image', {
                    name: img.assets[0].fileName,
                    type: img.assets[0].type,
                    uri: img.assets[0].uri
                })
                // values.image = img; 
                // console.log('555555555555555555555',img) 
                let response = await axios.post('/driver', formData, {
                    headers: {
                        'token': token
                    }
                });
                console.log(response)
                // await AsyncStorage.setItem('token', response.data.response.token)
                showMessage({
                    message: "Driver Added Successfully...",
                    type: "info",
                });
            }


            catch (error) {
                console.log(error)
                showMessage({
                    message: `${error.response.data.message}`,
                    type: "info",
                });
            }
        }
        // navigation.navigate('Home')
    };



    //edit user profile




    const readData = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            setImgErr('');
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            setToken(userAge)

        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    };

    const validate = (img) => {
        console.log('5', img)
        setImgErr('');
        let err = false;
        if (!img) {
            setImgErr('Please Choose Picture');
            err = true;
        }
        return err;
    }





    // useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     });

    //     // ImagePicker saves the taken photo to disk and returns a local URI to it
    //     let localUri = result.uri;
    //     let filename = localUri.split('/').pop();

    //     // Infer the type of the image
    //     let match = /\.(\w+)$/.exec(filename);
    //     let type = match ? `image/${match[1]}` : `image`;
    //     console.log(filename)
    //     console.log(result);
    //     console.log(type)

    //     if (!result.cancelled) {
    //         setImg(result.uri);
    //     }
    // };

    // const handleChoosePhoto = async () => {

    //     launchImageLibrary({ noData: true }, (response) => {
    //         console.log(response);
    //         setPhoto(response);
    //     });
    // };




    const driverValidationSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required('Name is Required'),
        liscence_number: yup
            .string()
            .trim()
            .required('License is required'),
        driver_number: yup
            .string()
            .trim()
            .required('Phone Number is required'),

    });
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'image', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const galleryPicker = () => {
        console.log('in')
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(response.assets[0].uri);
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // if (!response.assets[0].type.match(/.(jpg|jpeg|png)$/i)) {
                //     setImgErr('Please upload image only')
                // }
                setImg(response)
                console.log('222', source)
            }
        });
    }

    // const _renderUploadOverlay = () => {
    //     if (uploading) {
    //         return (
    //             <View
    //                 style={[StyleSheet.absoluteFill, styles.renderUploadStyle]}>
    //                 <ActivityIndicator color="#fff" size="large" />
    //             </View>
    //         );
    //     }
    // };

    // const _renderImage = () => {

    //     if (!image) {
    //         return;
    //     }

    //     return (
    //         <View
    //             style={styles.renderContainerStyle}>
    //             <View
    //                 style={styles.renderImageStyle}>
    //                 <Image source={{ uri: image }} style={styles.renderImageStyle} />
    //             </View>
    //         </View>
    //     );
    // };

    // const _takePhoto = async () => {
    //     const {
    //         status: cameraPerm
    //     } = await Permissions.askAsync(Permissions.CAMERA);

    //     const {
    //         status: cameraRollPerm
    //     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //     // only if user allows permission to camera AND camera roll
    //     if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
    //         let pickerResult = await ImagePicker.launchCameraAsync({
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //         });

    //         this._handleImagePicked(pickerResult);
    //     }
    // };

    // const _pickImage = async () => {
    //     const {
    //         status: cameraRollPerm
    //     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //     // only if user allows permission to camera roll
    //     if (cameraRollPerm === 'granted') {
    //         let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //         });

    //         _handleImagePicked(pickerResult);
    //     }
    // };

    // const _handleImagePicked = async pickerResult => {
    //     let uploadResponse, uploadResult;

    //     try {
    //         setUploading(true)

    //         if (!pickerResult.cancelled) {
    //             uploadResponse = await uploadImageAsync(pickerResult.uri);
    //             uploadResult = await uploadResponse.json();
    //         }
    //     } catch (e) {
    //         console.log({ uploadResponse });
    //         console.log({ uploadResult });
    //         console.log({ e });
    //         alert('Upload failed, sorry :(');
    //     } finally {
    //         if (!pickerResult.cancelled) {
    //             setImage(pickerResult.uri)
    //             setUploading(false)
    //             //   this.setState({
    //             //     image:pickerResult.uri,
    //             //     uploading: false
    //             //   });
    //             alert('upload success');
    //         } else {
    //             //   this.setState({
    //             //     uploading: false
    //             //   });
    //             setUploading(false)
    //         }
    //     }
    // };

    console.log(image)
    return (
        <View style={styles.container}>
            <Text h1>Driver Details</Text>
            <Formik
                validationSchema={driverValidationSchema}
                initialValues={{ name: '', liscence_number: '', driver_number: '' }}
                onSubmit={values => submitHandler(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <>
                        <Text style={styles.innerhead}>Driver Name</Text>
                        <TextInput
                            name="name"
                            placeholder="Driver Name"
                            style={styles.textInput}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                        }

                        <Text style={styles.innerhead}>License Number</Text>
                        <TextInput
                            name="licence"
                            placeholder="License Number"
                            style={styles.textInput}
                            onChangeText={handleChange('liscence_number')}
                            onBlur={handleBlur('liscence_number')}
                            value={values.liscence_number}
                        />
                        {errors.liscence_number &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.liscence_number}</Text>
                        }

                        <Text style={styles.innerhead}>Driver Mobile Number</Text>
                        <TextInput
                            name="driver_number"
                            placeholder="Drive Mobile Number"
                            style={styles.textInput}
                            onChangeText={handleChange('driver_number')}
                            onBlur={handleBlur('driver_number')}
                            value={values.driver_number}
                        />
                        {errors.driver_number &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.driver_number}</Text>
                        }

                        <Text style={styles.innerhead}>Licence Image</Text>
                        <Button title="Pick an image from camera roll" onPress={galleryPicker} />
                        <Text>{img && <Image source={{ uri: img.assets[0].uri }} style={{ width: 300, height: 200 }} />}</Text>

                        {
                            imgErr ? <Text style={{ fontSize: 10, color: 'red' }}> {imgErr} </Text> : <Text></Text>
                        }

                        {/* {photo && (
                            <>
                                <Image source={{ uri: photo.uri }}
                                    style={{ width: 300, height: 300 }}
                                />
                                <Button title="Upload Photo" onPress={handleUploadPhoto} />
                            </>
                        )} */}
                        {/* {photo && (
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 300, height: 300 }}
                            />
                        )}
                        <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}




                        <Text>{"\n"}</Text>
                        <Button
                            onPress={handleSubmit}
                            title="Add Driver"
                            style={styles.button}
                            disabled={!isValid}
                        />
                    </>
                )}
            </Formik>
        </View>
    );
}



const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Driver List"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Driver List"
                component={HomeScreen}

            />
            <Stack.Screen
                name="Driver"
                component={addDriverdetails}

            />
            <Stack.Screen
                name="Driver Details"
                component={Driver}

            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    mama: {
        backgroundColor: 'black',
        height: 100,
    },
    innerhead: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        height: '98%',

    },
    container2: {
        marginTop: 20
    },
    input: {
        width: 330,
        height: 44,
        padding: 6,

        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    textInput: {
        height: 40,
        width: '95%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        marginBottom: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 8
    },
    button: {
        margin: 10
    }
});


export default class Neww1 extends React.Component {
    render() {
        return <RootStack />;
    }
}