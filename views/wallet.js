import React, { useEffect, useState } from 'react';
import { TextInput,Dimensions } from 'react-native';
import { ScrollView, Button, StyleSheet, TouchableHighlight, Pressable, Modal, Text, View, } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ico from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../instances/instance';




const Balance = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [security, setsecurity] = useState('');
    const [email, setEmail] = useState('');
    const [card, setcard] = useState([]);
    const [phno, setPhno] = useState('');
    const [detail, setDetail] = useState('');



    console.log(amount)
    useEffect(() => {
        navigation.addListener('focus', () => {
            loadCard();
        });
    }, [navigation]);

    const loadCard = async () => {
        try {
            const userAge = await AsyncStorage.getItem('token');
            let response = await axios.get('/vendor-booking', {
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
    // console.log(card)


    useEffect(() => {
        navigation.addListener('focus', () => {
            loadCard2();
        });
    }, [navigation]);

    const loadCard2 = async () => {
        try {
            const userAge = await AsyncStorage.getItem('token');
            let response = await axios.get('/payment-data', {
                headers: {
                    'token': userAge
                }
            });
            console.log('print')
            setDetail(response.data.response)
            console.log(response.data)
            // console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            readData();
        });
    }, [navigation]);

    const readData = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            // console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/user/profile', {
                headers: {
                    'token': userAge
                }
            });
            // console.log(response.data)
            // console.log(response.data.response.userData.security)
            setsecurity(response.data.response.userData.security)
            setEmail(response.data.response.userData.email)
            setPhno(response.data.response.userData.phoneNumber)

        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }

    const Rajor = (id, amoun) => {
        let options = {
            description: 'Add money in wallet',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_LygVF67gpHCj5A',
            amount: amoun,
            name: 'SD Taxi Bazar',
            prefill: {
                email: email,
                contact: phno,
            },
            order_id: id,
            theme: { color: '#F37254' },
        };
        console.log(options)
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data}`);
        }).catch((error) => {
            // handle failure
            console.log(error)
            alert(`Erro: ${error.code | error.description}`);
        });
    };

    const submitHandler = async () => {
        try {
            let amt = { amount }
            console.log(amt)
            console.log('hh')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)

            let response = await axios.post('/payment/order', amt, {
                headers: {
                    'token': userAge
                }
            });
            console.log(response.data)
            console.log(response.data.response.id)
            Rajor(response.data.response.id, response.data.response.amount)
            setAmount('')
            // await AsyncStorage.setItem('token', response.data.response.token)
            // Snackbar.show({
            //     text: 'Bank Account Added successfully',
            //     duration: Snackbar.LENGTH_LONG,
            // });
        }
        catch (error) {
            console.log(error.response)
            console.log('cool')

            let err = error.response.data.message;
            console.log(err)

            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,


            });

        }
    };



    return (
        <View style={styles.container}>
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
                        <Text style={styles.text}>Add money in Wallet:</Text>
                        <TextInput
                            name="money"
                            keyboardType="numeric"
                            placeholder="Add Amount"
                            onChangeText={e => setAmount(e)}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={submitHandler}
                        >
                            <Text style={styles.textStyle}>Pay</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!isModalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.walletContainer} >

                <Text style={styles.textAlign}>Current wallet Balance :</Text>


                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 50 }}> Rs {security} </Text>
                </View>


                <Button

                    title="Add MONEY"
                    onPress={() => { setModalVisible(!isModalVisible) }}
                />
                <Text> * Up to RS. 1000 is registeration and verification charges and is non-refundable. Although it will remain in your wallet</Text>
            </View>
            <View >

                <Text style={{ fontSize: 20 }}>Total Amount:RS {detail.totalAmountEarn}</Text>
                <Text style={{ fontSize: 20 }}>Total Vendor Amount:RS {detail.totalVendorEarn}</Text>
                <Text style={{ fontSize: 20 }}>Total Paid :RS {detail.totalAmountPay}</Text>
                <Text style={{ fontSize: 20 }}>Total Balance:RS 10</Text>
                {/* <Text style={{ fontSize: 20 }}>Total Panelty:RS 0</Text> */}
            </View>

            <ScrollView style={{height: 350}} style={{backgroundColor:"black"}}>
                {
                    card.map(item => {
                        return (
                            <Card key={item.id} containerStyle={styles.cardss} style={{ marginTop: 3 }} >
                                <Card.Content>
                                    <Title>
                                        <Text><Icon name="circle-o" size={30} color="#900" />  {item.from}</Text>{"\n"}
                                        <Text><Icon name="map-marker" size={30} color="#900" /> {item.to}</Text>
                                    </Title>
                                    <Paragraph>

                                        <Text><Icon name="taxi" size={20} color="#900" /> {item.carCategory}</Text>
                                    </Paragraph>

                                    <Paragraph>
                                        <Text><Icon name="check-square" size={30} color="#900" /> Start date:{item.startDate} </Text> {"\n"}
                                        <Text><Icon name="check-square" size={30} color="#900" /> Return date:{item && item.returnDate ? item.returnDate : 'N/A'}</Text> {"\n"}


                                        <Text><Icon name="check-square" size={30} color="#900" />  Booking ID:{item.booking_id} </Text> {"\n"}
                                        <Text>cashcollected:</Text> {"\n"}
                                        <Text>Vendor amount:{item.vendor_amount} </Text> {"\n"}

                                        <Text>balance:{item.margin}</Text>

                

                                    </Paragraph>

                                </Card.Content>


                            </Card>
                        )
                    })
                }
            
              


            </ScrollView>



        </View>
    );
};




const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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
    text: {
        color: '#3f2949',
        marginTop: 10,
        fontSize: 30
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    textAlign: {
        fontSize: 20,
        marginBottom: 5
    },
    walletContainer: {
        marginTop: 10,
        marginBottom: 40
    },
    container: {

        paddingTop: 40,
        padding: 15,
        backgroundColor: 'white',



    },



});

export default Balance;