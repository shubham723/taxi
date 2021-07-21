import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../instances/instance';
import Snackbar from 'react-native-snackbar';
import Login from './login';

const Signup = ({ navigation }) => {
    const [user] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        aadharNumber: '',
        panNumber: '',
        registeredName: ''
    })
    const signUpValidationSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required('Name is Required'),
        email: yup
            .string()
            .trim()
            .email('Must be valid email')
            .required('Email is Required'),
        password: yup
            .string()
            .trim()
            .min(8, 'Password must be atleast 8 Chracters')
            .required('Password is Required'),
        phoneNumber: yup
            .string()
            .trim()
            .min(10, 'Password must be atleast 10 number')
            .max(10, 'Password should not exceed 10 number')
            .required('Phone Number is Required'),
        aadharNumber: yup
            .string()
            .trim()
            .required('Aadhar Number is Required'),
        panNumber: yup
            .string()
            .trim()
            .required('PAN Number is Required'),
        registeredName: yup
            .string()
            .trim()
            .required('Company Name is Required'),
    });

    const submitHandler = async (values, resetForm) => {
        console.log(values);
        try {
            values.role = 'driver';
            await axios.post('/signUp', values);
            Snackbar.show({
                text: 'Account Created Successfully',
                duration: Snackbar.LENGTH_LONG,
            });
            resetForm(user);
            navigation.navigate('Login')
        }
        catch (error) {
            console.log('555', error.response.data)
            let err = error.response.data.message;
            // console.log(error.response)

            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,
            });

        }

        // navigation.navigate('Home')
    };

    console.log(navigation)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Sign up to get Started :</Text>

            <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{ name: '', email: '', password: '', phoneNumber: '', aadharNumber: '', panNumber: '', registeredName: '' }}
                onSubmit={(values, {resetForm}) => submitHandler(values, resetForm)}
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
                        <Text style={styles.head}>Name:</Text>
                        <TextInput
                            name="name"
                            placeholder="Name"
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                        }

                        <Text style={styles.head}>Email:</Text>
                        <TextInput
                            name="email"
                            placeholder="Email"
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                        }

                        <Text style={styles.head}>Password:</Text>
                        <TextInput
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}

                        />
                        {errors.password &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                        }

                        <Text style={styles.head}>Phone Number:</Text>
                        <TextInput
                            name="phoneNumber"
                            placeholder="Phone Number"
                            style={styles.input}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            keyboardType='numeric'
                        />
                        {errors.phoneNumber &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                        }


                        <Text style={styles.head}>Aadhar Number:</Text>
                        <TextInput
                            name="aadharNumber"
                            placeholder="Aadhar Number"
                            style={styles.input}
                            onChangeText={handleChange('aadharNumber')}
                            onBlur={handleBlur('aadharNumber')}
                            value={values.aadharNumber}
                            keyboardType='numeric'

                        />
                        {errors.aadharNumber &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.aadharNumber}</Text>
                        }


                        <Text style={styles.head}>PAN Number:</Text>
                        <TextInput
                            name="panNumber"
                            placeholder="PAN number"
                            style={styles.input}
                            onChangeText={handleChange('panNumber')}
                            onBlur={handleBlur('panNumber')}
                            value={values.panNumber}

                        />
                        {errors.panNumber &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.panNumber}</Text>
                        }


                        <Text style={styles.head}>Company Name:</Text>
                        <TextInput
                            name="registeredName"
                            placeholder="Company Name"
                            style={styles.input}
                            onChangeText={handleChange('registeredName')}
                            onBlur={handleBlur('registeredName')}
                            value={values.registeredName}
                        />
                        {errors.registeredName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.registeredName}</Text>
                        }




                        <Button
                            onPress={handleSubmit}
                            title="Create New Account"
                            style={styles.button}
                            disabled={!isValid}
                        />

                    </>
                )}
            </Formik>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: 380,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    inputext: {
        width: 200,
        height: 44,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    head: {

    },
    heading: {
        width: 400,
        height: 50,
        borderColor: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,

    },
    button: {
        alignSelf: 'stretch'
    },
    signup: {
        color: '#b58603',
        marginBottom: 8,
        marginTop: 3
    },
    register: {
        width: 250,
        marginBottom: 3,
        marginTop: 5,
        fontWeight: 'bold',


    }
});

export default Signup;