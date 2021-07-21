
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableHighlight, SafeAreaView, Pressable } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
// import Modal from 'react-native-modal';
// import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.


import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../instances/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { white } from 'react-native-paper/lib/typescript/styles/colors';
// import {launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from "react-native-image-picker";
// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';

const cardclick = ({ route, navigation }) => {
    const { id } = route.params;
    const [booking, setBooking] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [headers, setheaders] = useState('');
    const [dis, isdis] = useState(false);



    useEffect(() => {
        loadBooking();
    }, []);

    const loadBooking = async () => {
        try {
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            setheaders(userAge)
            // console.log(headers)
            let response = await axios.get(`/booking-detail/${id}`, {
                headers: {
                    'token': userAge
                }
            });
            setBooking(response.data.response)
            console.log(response.data)
        }
        catch (error) {

        }
    };

    const ConfirmBooking = async () => {
        isdis(true)
        try {
            await axios.post(`/assigned-vendor/${id}`, {}, {
                headers: {
                    'token': headers
                }
            });

            Snackbar.show({
                text: 'Booked successfully',
                duration: Snackbar.LENGTH_LONG,
            });
            setTimeout(() => {
                navigation.navigate('Home')
            }, 1000);

        }
        catch (error) {
            console.log(error.response.data)
            Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_LONG,
            });
        }
        
        setTimeout(() => {
            setModalVisible(!isModalVisible);
            isdis(false)
            
        }, 1000);

    };
    const submitHandler = async () => {
        try {

            const userAge = await AsyncStorage.getItem('token');
            console.log('token')

            console.log(userAge)
            console.log(id)

            let response = await axios.post('/assigned-vendor/:id', {}, id, {
                headers: {
                    'token': userAge
                }
            });
            Snackbar.show({
                text: 'Booked successfully',
                duration: Snackbar.LENGTH_LONG,
            });
        }
        catch (error) {
            console.log(error.response)
            console.log('catch')

            // let err = error.response.data.message;
            // console.log(err)

            // Snackbar.show({
            //     text: err,
            //     duration: Snackbar.LENGTH_LONG,


            // });

        }
        setModalVisible(!isModalVisible)
    };


    console.log(booking)

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text} >Are you sure want to confirm booking?</Text>
                        <Pressable>
                            <Button style={styles.button}  onPress={ConfirmBooking} title="Confirm" disabled={dis}></Button>   
                        
                            <Button style={styles.button} title="Cancel" onPress={() => setModalVisible(!isModalVisible)}></Button>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Text> Booking ID: {booking.booking_id} </Text>
            <Text style={{ textTransform: 'uppercase' }}> <Icon name="circle-o" size={30} color="#900" />  {booking.from} </Text>
            <Text style={{ textTransform: 'uppercase' }}> <Icon name="map-marker" size={30} color="#900" /> {booking.to} </Text>

            <Text> <Icon name="taxi" size={30} color="#900" /> {booking.carCategory} </Text>
            <Text> <Icon name="money" width={33} size={30} color="#900" /> Rs.{booking.vendor_amount} </Text>
            {/* <Text> <Icon name="info-circle" size={30} color="#900" /> {booking.paymentMode} </Text> */}
            <Text>  Start Time: {booking.time} </Text>
            <Text>  Start Date: {booking.startDate} </Text>
            <Text>  Return Date: {booking && booking.returnDate ? booking.returnDate : 'N/A'} </Text>
            <Button
                title="ACCEPT"
                style={styles.button}
                onPress={() => { setModalVisible(!isModalVisible) }}
               
            >
            </Button>

        </View>
    )

}

const MyComponent = ({ props, navigation }) => {
    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    const [card, setcard] = useState([]);

    // const [items, setItems] = useState([
    //   {label: 'Apple', value: 'apple' },
    //   {label: 'Banana', value: 'banana' }
    // ]);
    // const toggleModal = () => {
    //   console.log('88')
    //   setModalVisible(!isModalVisible);
    // };
    // useEffect(async() => 
    //   await AsyncStorage.setItem('s', 'df')
    //   let a = AsyncStorage.getItem('s')
    //   console.log(a)
    // }, []);

    // console.log(AsyncStorage.getItem('s'))

    useEffect(() => {
        console.log('d')
        navigation.addListener('focus', () => {
            loadCard();
        });

    }, [navigation]);
    useEffect(() => {

        loadCard();

    }, []);

    const loadCard = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/app-booking', {
                headers: {
                    'token': userAge
                }
            });
            setcard(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }

    console.log(card);
    // const options = {
    //     title: 'Select Avatar',
    //     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //   };

    // const openCamera =()=>{
    //     launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
    //       console.log('Response = ', response);

    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         const source = { uri: response.uri };

    //         // You can also display the image using data:
    //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //         console.log(source)
    //       }
    //     });
    // }

    // const galleryPicker =()=>{
    //     launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
    //       console.log('Response = ', response);

    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         const source = { uri: response.uri };

    //         // You can also display the image using data:
    //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //         console.log(source)
    //       }
    //     });
    // }
    return (
        <View>
            <Button
                title="Click to get new Booking"
                style={styles.button}
                onPress={loadCard}
            ></Button>

            {
                card &&
                
                card.map(item => {
                    return (

                        <Card key={item.id} style={{ margin: 10 }} onPress={() => navigation.navigate('Accept Booking', { id: item.id })}>
                            <Card.Content>
                                <Title style={styles.center}>
                                    <Text>{item.type}  </Text>
                                </Title>
                                <Title>
                                    <Text style={{ textTransform: 'uppercase' }}> <Icon name="circle-o" size={30} color="#900" /> {item.from} </Text> {"\n"}
                                    <Text style={{ textTransform: 'uppercase' }}> <Icon name="map-marker" size={30} color="#900" /> {item.to} </Text>
                                </Title>
                                {/* <Paragraph>
                    <Icon name="money" width={33} size={30} color="#900" /> item.vendor_amount

                    <Icon name="taxi" size={30} color="#900" /> item.carCategory
                    <Icon name="info-circle" size={30} color="#900" /> item.paymentMode {"\n"}
                </Paragraph> */}

                                <Title>
                                    <Icon name="car" style={styles.car} size={30} color="#900" />
                                    <Text>{item.carCategory}</Text>
                                </Title>
                                <Paragraph style={styles.para}>
                                    <Text>  Start Date: {item.startDate} </Text> {"\n"}
                                    <Text>  Return Date: {item.returnDate || 'N/A'} </Text> {"\n"}
                                    <Text>  Time: {item.time || 'N/A'} </Text> {"\n"}
                                    <Text>  Amount: {item.vendor_amount}</Text> {"\n"}

                                </Paragraph>
                                <Paragraph>
                                    <Text> {item.remarks} </Text>
                                </Paragraph>

                            </Card.Content>
                            <Card.Actions>


                            </Card.Actions>
                        </Card>
                    )

                })
            }
        </View>
    );
}

const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Home"
                component={MyComponent}

            />
            <Stack.Screen
                name="Accept Booking"
                component={cardclick}

            />

        </Stack.Navigator>
    );
}
export default class apphome extends React.Component {
    render() {
        return <RootStack />;
    }
}



const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        padding: 100,
    },
    para: {


    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    car: {
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        margin:10,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


  //     const loginValidationSchema = yup.object().shape({
  //         email: yup
  //             .string()
  //             .email("Please enter valid email")
  //             .required('Email Address is Required'),
  //         password: yup
  //             .string()
  //             .min(8, ({ min }) => `Password must be at least ${min} characters`)
  //             .required('Password is required'),
  //     })

  //     return (
  //         <>
  //             <View style={styles.loginContainer}>
  //                 <Text>Login Screen</Text>
  //                 <Formik
  //                     validationSchema={loginValidationSchema}
  //                     initialValues={{ email: '', password: '' }}
  //                     onSubmit={values => console.log(values)}
  //                 >
  //                     {({
  //                         handleChange,
  //                         handleBlur,
  //                         handleSubmit,
  //                         values,
  //                         errors,
  //                         isValid,
  //                     }) => (
  //                         <>
  //                             <TextInput
  //                                 name="email"
  //                                 placeholder="Email Address"
  //                                 style={styles.textInput}
  //                                 onChangeText={handleChange('email')}
  //                                 onBlur={handleBlur('email')}
  //                                 value={values.email}
  //                                 keyboardType="email-address"
  //                             />
  //                             {errors.email &&
  //                                 <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
  //                             }
  //                             <TextInput
  //                                 name="password"
  //                                 placeholder="Password"
  //                                 style={styles.textInput}
  //                                 onChangeText={handleChange('password')}
  //                                 onBlur={handleBlur('password')}
  //                                 value={values.password}
  //                                 secureTextEntry
  //                             />
  //                             {errors.password &&
  //                                 <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
  //                             }
  //                             <Button
  //                                 onPress={handleSubmit}
  //                                 title="LOGIN"
  //                                 disabled={!isValid}
  //                             />
  //                         </>
  //                     )}
  //                 </Formik>
  //             </View>
  //         </>
  //     )
  // }

  // const styles = StyleSheet.create({
  //     loginContainer: {
  //         width: '80%',
  //         alignItems: 'center',
  //         backgroundColor: 'white',
  //         padding: 10,
  //         elevation: 10,
  //         backgroundColor: '#e6e6e6'
  //     },
  //     textInput: {
  //         height: 40,
  //         width: '100%',
  //         margin: 10,
  //         backgroundColor: 'white',
  //         borderColor: 'gray',
  //         borderWidth: StyleSheet.hairlineWidth,
  //         borderRadius: 10,
  //     },
  // })