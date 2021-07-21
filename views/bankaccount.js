import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../instances/instance';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const Bankaccount = ({navigation}) => {
    const [bank, setBank] = useState({
        accountName: '',
        accountNumber: '',
        IFSCCode: '',
        branchName: '',
        bankName: ''
    });
    const [token, setToken] = useState('');

    const bankValidationSchema = yup.object().shape({
        accountName: yup
            .string()
            .trim()
            .required('Name is Required'),
        accountNumber: yup
            .string()
            .trim()
            .required('Account Number is Required'),
        IFSCCode: yup
            .string()
            .trim()
            .required('IFSC Code is Required'),
        branchName: yup
            .string()
            .trim()
            .required('Branch Name is Required'),
        bankName: yup
            .string()
            .trim()
            .required('Account Holder Name is Required'),
    });

    useEffect(() => {
        navigation.addListener('focus', () => {
            readData();
          });
    }, [navigation]);

    const readData = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/bank', {
                headers: {
                    'token': userAge
                }
            });
            console.log(response.data)
            setBank(response.data.response)
            
        } catch (e) {
            
            // alert('Failed to fetch the data from storage')
        }
    }

    const submitHandler = async (values) => {
        console.log(token);
        try {
            let response = await axios.post('/bank', values, {
                headers: {
                    'token': token
                }
            });
            console.log(response.data)
            // await AsyncStorage.setItem('token', response.data.response.token)
            Snackbar.show({
                text: 'Bank Account Updated successfully',
                duration: Snackbar.LENGTH_LONG,
            });
        }
        catch (error) {
            console.log(error.response)

            let err = error.response.data.message;

            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,


            });
            
        }

        // navigation.navigate('Home')
    };

    console.log(bank)

    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
                validationSchema={bankValidationSchema}
                initialValues={bank}
                onSubmit={values => submitHandler(values)}
                enableReinitialize= {true}
                // validateOnMount = {true}
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
                        <Text style={styles.innerhead}>Bank Name</Text>
                        <TextInput
                            name="bankName"
                            placeholder="Bank Name"
                            style={styles.textInput}
                            onChangeText={handleChange('bankName')}
                            onBlur={handleBlur('bankName')}
                            defaultValue={bank && bank.bankName ? bank.bankName : '' }
                        />
                        {errors.bankName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.bankName}</Text>
                        }

                        {console.log(values)}

                        <Text style={styles.innerhead}>Account Number</Text>
                        <TextInput
                            name="accountNumber"
                            placeholder="Account Number"
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={handleChange('accountNumber')}
                            onBlur={handleBlur('accountNumber')}
                            defaultValue={bank && bank.accountNumber ? bank.accountNumber : '' }
                        />
                        {errors.accountNumber &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.accountNumber}</Text>
                        }

                        <Text style={styles.innerhead}>IFSC Code</Text>
                        <TextInput
                            name="IFSCCode"
                            placeholder="IFSC Code"
                            style={styles.textInput}
                            onChangeText={handleChange('IFSCCode')}
                            onBlur={handleBlur('IFSCCode')}
                            defaultValue={bank && bank.IFSCCode ? bank.IFSCCode : '' }
                        />
                        {errors.IFSCCode &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.IFSCCode}</Text>
                        }


                        <Text style={styles.innerhead}>Branch Name</Text>
                        <TextInput
                            name="branchName"
                            placeholder="Branch Name"
                            style={styles.textInput}
                            onChangeText={handleChange('branchName')}
                            onBlur={handleBlur('branchName')}
                            defaultValue={bank && bank.branchName ? bank.branchName : '' }
                        />
                        {errors.branchName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.branchName}</Text>
                        }

                        <Text style={styles.innerhead}>Account Holder Name</Text>
                        <TextInput
                            name="accountName"
                            placeholder="Account Name"
                            style={styles.textInput}
                            onChangeText={handleChange('accountName')}
                            onBlur={handleBlur('accountName')}
                            defaultValue={bank && bank.accountName ? bank.accountName : '' }
                        />
                        {errors.accountName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.accountName}</Text>
                        }

                        <Button
                            onPress={handleSubmit}
                            title="Update Bank Account"
                            style={styles.button}
                        />
                    </>
                )}
            </Formik>
        </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    mama: {
        backgroundColor: 'black',
        height: '100%',
    },
    innerhead: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        height: '98%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,

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
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        padding: 8,
        
    },
});

export default Bankaccount;