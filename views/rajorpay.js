import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Rajor = () => {
    console.log(RazorpayCheckout.open)
    return (
        <View style={styles.centeredView}>

            <TouchableHighlight onPress={() => {
                var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.png',
                    currency: 'INR',
                    key: 'rzp_test_1DP5mmOlF5G5ag',
                    amount: '5000',
                    name: 'foo',
                    prefill: {
                        email: 'void@razorpay.com',
                        contact: '9191919191',
                        name: 'Razorpay Software'
                    },
                    theme: { color: '#F37254' },
                }
                console.log(options)
                RazorpayCheckout.open(options).then((data) => {
                    // handle success
                    alert(`Success: ${data}`);
                }).catch((error) => {
                    // handle failure
                    console.log(error)
                    alert(`Erro: ${error.code | error.description}`);
                });
            }}>
                <Text style={styles.text}>PAY</Text>
            </TouchableHighlight>
            <Text>dk</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        padding: 100,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Rajor;