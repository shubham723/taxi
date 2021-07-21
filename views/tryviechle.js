import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as yup from 'yup';
// import * as ImagePicker from 'expo-image-picker';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from '../instances/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import baseURL from '../instances/baseUrl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import DropDownPicker from 'react-native-dropdown-picker';




export const Vehicle = ({ route }) => {

    console.log(route)
    const { id } = route.params;

    const [vehicle, setVehicle] = useState({});
    useEffect(() => {
        loadVehicle();
    }, [id]);

    const loadVehicle = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get(`/vehicle-detail/${id}`, {
                headers: {
                    'token': userAge
                }
            });
            setVehicle(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }
    console.log(vehicle);
    return (
        <ScrollView style={StyleSheet.scroll}>
            <View style={styles.container}>

                <Text h1 style={styles.innerhead}>Vehicle Number</Text>
                <TextInput
                    style={styles.input}
                    value={vehicle.vehicle_number}
                    editable={false}
                />

                <Text style={styles.innerhead}>Vehicle Model</Text>
                <TextInput
                    style={styles.input}
                    value={vehicle.model}
                    editable={false}
                />

                <Text style={styles.innerhead}>Rc Image</Text>
                <Image source={{ uri: `${baseURL}/${vehicle.rc}` }} style={{ width: 200, height: 200 }} />



                <Text style={styles.innerhead}>Insurance Image</Text>
                <Image source={{ uri: `${baseURL}/${vehicle.insurance}` }} style={{ width: 200, height: 200 }} />



                <Text h1 style={styles.innerhead}>Permit Image</Text>
                <Image source={{ uri: `${baseURL}/${vehicle.permit}` }} style={{ width: 200, height: 200 }} />



            </View>
        </ScrollView>
    );

};


export const HomeScreen = ({ navigation }) => {

    const [vehicle, setVehicle] = useState([]);
    useEffect(() => {
        navigation.addListener('focus', () => {
            loadVehicle();
        });
    }, [navigation]);
    const loadVehicle = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/vehicle', {
                headers: {
                    'token': userAge
                }
            });
            setVehicle(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }

    return (
        <ScrollView>
            <View style={styles.container2}
            >
                {
                    vehicle.map(item => {
                        return (


                            <Card style={{ marginBottom: 8 }}
                                onPress={() => navigation.navigate('Show Vehicle Detail', { id: item.id })} key={item.id}>
                                <Card.Title title=" " />
                                <Card.Content>


                                    <Paragraph>
                                        Vehicle No.: {item.vehicle_number}  {"\n"}
                                        Vehicle Model:{item.model}
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
                        title="add your vehicle details"
                        onPress={() => navigation.navigate('Add Vehicle')}
                    />
                </View>



            </View>
        </ScrollView>
    );

}
const Vehicledetails = () => {

    const [token, setToken] = useState('');
    // dropdown state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Hatchback', value: 'hatchback' },

        { label: 'Sedan', value: 'sedan' },
        { label: 'Suv', value: 'suv' },

    ]);
    const [imgErr, setImgErr] = useState('');
    const [insuranceErr, setInsuanceErr] = useState('');
    const [permitErr, setPermitErr] = useState('');
    const [rcImage, setRCImage] = useState('');
    const [insuranceImage, setInsuransceImage] = useState('');
    const [permitImage, setPermitImage] = useState('');


    const validate = (img, insurance, permit) => {
        console.log('5', img)
        setImgErr('');
        setPermitErr('');
        setInsuanceErr('');
        let err = false;
        if (!img) {
            setImgErr('Please Choose RC Image');
            err = true;
        }
        if(!insurance){
            setInsuanceErr('Please Choose Insurance Image');
            err = true;
        }
        if(!permit){
            setPermitErr('Please Provide Permit Image');
            err = true;
        }
        return err;
    }

    const submitHandler = async (values) => {
        console.log(values);
        
        const validation = validate(rcImage, insuranceImage, permitImage);
        if (!validation) {
            try {
                const formData = new FormData();
                formData.append('vehicle_number', values.vehicle_number)
                formData.append('model', values.model)
                formData.append('rc', {
                    name: rcImage.assets[0].fileName,
                    type: rcImage.assets[0].type,
                    uri: rcImage.assets[0].uri
                })
                formData.append('insurance', {
                    name: insuranceImage.assets[0].fileName,
                    type: insuranceImage.assets[0].type,
                    uri: insuranceImage.assets[0].uri
                })
                formData.append('permit', {
                    name: permitImage.assets[0].fileName,
                    type: permitImage.assets[0].type,
                    uri: permitImage.assets[0].uri
                })
                // values.rc = rcImage;
                // values.insurance = insuranceImage;
                // values.permit = permitImage;
                console.log('5465645')


                let response = await axios.post('/Vehicle', formData, {
                    headers: {
                        'token': token
                    }
                });
                console.log(response.data)
                // await AsyncStorage.setItem('token', response.data.response.token)
                showMessage({
                    message: "Vehicle Added Successfully...",
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

    

    useEffect(() => {
        readData();
    }, []);

    const readData = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            setToken(userAge)

        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
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

    // const pickRCImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         setRCImage(result.uri);
    //     }
    // };

    // const pickInsuranceImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         setInsuransceImage(result.uri);
    //     }
    // };

    // const pickPermitImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         setPermitImage(result.uri);
    //     }
    // };

    const viechleValidationSchema = yup.object().shape({
        vehicle_number: yup
            .string()
            .trim()
            .required('Name is Required'),
        model: yup
            .string()
            .trim()
            .required('Model is Required'),

    });
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const galleryRC = () => {
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setRCImage(response);
                console.log(source)
            }
        });
    };

    const galleryPermit = () => {
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPermitImage(response);
                console.log(source)
            }
        });
    };

    const galleryInsurance = () => {
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setInsuransceImage(response);
                console.log(source)
                console.log(response)

            }
        });
    }



    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>


                <Formik
                    validationSchema={viechleValidationSchema}
                    initialValues={{ vehicle_number: '', model: '' }}
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
                            <Text style={styles.innerhead}>Vehicle Number</Text>
                            <TextInput
                                name="vehicle_number"
                                placeholder="Vehicle Name"
                                style={styles.textInput}
                                onChangeText={handleChange('vehicle_number')}
                                onBlur={handleBlur('vehicle_number')}
                                value={values.vehicle_number}
                            />
                            {errors.vehicle_number &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.vehicle_number}</Text>
                            }
                            {/* <Text style={styles.innerhead}>Vehicle Category</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={handleChange('category')}
                                onBlur={handleBlur('category')}
                            /> */}

                            <Text style={styles.innerhead}>Model Name</Text>
                            <TextInput
                                name="model"
                                placeholder="Model"
                                style={styles.textInput}
                                onChangeText={handleChange('model')}
                                onBlur={handleBlur('model')}
                                value={values.model}
                            />
                            {errors.model &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.model}</Text>
                            }

                            <Text style={styles.innerhead}>RC Image</Text>
                            <Button title="Pick an image from camera roll" onPress={galleryRC} />
                            {
                                imgErr ? <Text style={{ fontSize: 10, color: 'red' }}> {imgErr} </Text> : <Text></Text>
                            }
                            <Text>{rcImage && <Image source={{ uri: rcImage.assets[0].uri }} style={{ width: 200, height: 200 }} />}</Text>


                            <Text style={styles.innerhead}>Insurance Image</Text>
                            <Button title="Pick an image from camera roll" onPress={galleryInsurance} />
                            {
                                insuranceErr ? <Text style={{ fontSize: 10, color: 'red' }}> {insuranceErr} </Text> : <Text></Text>
                            }
                            <Text>{insuranceImage && <Image source={{ uri: insuranceImage.assets[0].uri }} style={{ width: 200, height: 200 }} />}</Text>

                            <Text style={styles.innerhead}>Permit Image</Text>
                            <Button title="Pick an image from camera roll" onPress={galleryPermit} />
                            {
                                permitErr ? <Text style={{ fontSize: 10, color: 'red' }}> {permitErr} </Text> : <Text></Text>
                            }
                            <Text>{permitImage && <Image source={{ uri: permitImage.assets[0].uri }} style={{ width: 200, height: 200 }} />}</Text>
                            <Text>{"\n"}</Text>
                            <Button
                                onPress={handleSubmit}
                                title="Add vehicle"
                                style={styles.button}
                                disabled={!isValid}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}



const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Vehicle list"
            screenOptions={{
                gestureEnabled: false,
            }}

        >
            <Stack.Screen
                name="Vehicle list"
                component={HomeScreen}

            />
            <Stack.Screen
                name="Add Vehicle"
                component={Vehicledetails}

            />
            <Stack.Screen
                name="Show Vehicle Detail"
                component={Vehicle}

            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    scroll: {
        paddingTop: 50
    },
    mama: {
        backgroundColor: 'black',
        height: 100,
    },
    innerhead: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 13,

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        paddingTop: 50

    },

    input: {
        width: 330,
        height: 44,
        padding: 6,

        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    container2: {
        marginTop: 10
    },
    textInput: {
        height: 40,
        width: '95%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
});


export default class Neww extends React.Component {
    render() {
        return <RootStack />;
    }
}
