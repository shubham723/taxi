import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../instances/instance';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './authcontext';
import { Formik } from 'formik';
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';


const Forgotpass = ({ navigation }) => {
    const [screen, setScreen] = useState('email');
    const signUpValidationSchema1 = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email('Must be valid email'),
        phoneNumber: yup
            .string()
            .trim()
            .min(10, 'Phone number must be 10 Numbers'),


    });
    const signUpValidationSchema2 = yup.object().shape({
        
        authyId: yup
            .string()
            .trim()
            .min(6, 'OTP must be of 6 Numbers'),


    });

    const signUpValidationSchema3 = yup.object().shape({
        password: yup
            .string()
            .trim()
            .min(8, 'Password must be atleast 8 Chracters')
            .required('Password is Required'),
        confirmPassword: yup
            .string()
            .trim()
            .min(8, 'Password must be atleast 8 Chracters')
            .required('Password is Required'),

    });

    const submitHandler = async (values) => {
        console.log('***', values);
        try {
            let response = await axios.post('/auth/otp', values);

            console.log('***', response.data.response)
            await AsyncStorage.setItem('passwordToken', response.data.response)

            Snackbar.show({
                text: 'OTP sent successfully',
                duration: Snackbar.LENGTH_LONG,
            });
            setScreen('otp')
        }
        catch (error) {
            console.log('.,', error.response.data);
            let err = error.response.data.message;


            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,


            });

        }

        // navigation.navigate('Home')
    };

    const submitHandlerotp = async (values) => {
        console.log('***', values);
        try {
            const emailtoken = await AsyncStorage.getItem('passwordToken');
            let response = await axios.post('/auth/verify', values, {
                headers: {
                    'token': emailtoken
                }
            });
            console.log(response)


            Snackbar.show({
                text: 'OTP verified',
                duration: Snackbar.LENGTH_LONG,



            });
            setScreen('password')
        }
        catch (error) {
            console.log('.,', error.response.data);
            let err = error.response.data.message;


            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,


            });

        }

        // navigation.navigate('Home')
    };

    const submitHandlerPass = async (values) => {
        console.log('***', values);
        try {
            const emailtoken = await AsyncStorage.getItem('passwordToken');
            let response = await axios.post('/auth/reset', values, {
                headers: {
                    'token': emailtoken
                }
            });
            console.log(response)


            Snackbar.show({
                text: 'Password updated successfully',
                duration: Snackbar.LENGTH_LONG,



            });
            navigation.navigate('Home')

        }
        catch (error) {
            console.log('.,', error.response.data);
            let err = error.response.data.message;


            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,


            });

        }

    };

    return (
        <View>
            {
                screen === 'email' ? (
                    <>
                        <Formik
                            validationSchema={signUpValidationSchema1}
                            initialValues={{ email: '', phoneNumber: '' }}
                            onSubmit={values => submitHandler(values)}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                isValid,
                            }) => (
                                <>
                                    <Text>Enter Email:</Text>
                                    <TextInput
                                        name="email"
                                        style={styles.input}
                                        placeholder="Email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}

                                    />
                                    {errors.email &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    }

                                    <Text>Enter Mobile Number:</Text>
                                    <TextInput
                                        name="phoneNumber"
                                        style={styles.input}
                                        placeholder="Phone Number"
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}
                                        keyboardType="numeric"
                                    />
                                    {errors.phoneNumber &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                                    }
                                    <Button
                                        title="SEND OTP"
                                        style={styles.button}
                                        onPress={handleSubmit}

                                    />

                                </>
                            )}
                        </Formik>
                    </>
                ) : screen === 'otp' ? (
                    <>
                        <Formik
                            validationSchema={signUpValidationSchema2}
                            initialValues={{ authyId: '', }}
                            onSubmit={values => submitHandlerotp(values)}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                isValid,
                            }) => (
                                <>
                                    <Text>Enter otp Sent to Email/Mobile</Text>
                                    <TextInput
                                        name="authyId"
                                        style={styles.input}
                                        placeholder="otp"
                                        onChangeText={handleChange('authyId')}
                                        onBlur={handleBlur('authyId')}
                                        keyboardType="numeric"
                                        value={values.authyId}
                                    />
                                    {errors.authyId &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.authyId}</Text>
                                    }
                                    <Button
                                        title="Verify OTP"
                                        style={styles.button}
                                        onPress={handleSubmit}
                                    />
                                </>
                            )}
                        </Formik>
                    </>
                ) : screen === 'password' ? (
                    <>
                        <Formik
                            validationSchema={signUpValidationSchema3}
                            initialValues={{ password: '', confirmPassword: '', }}
                            onSubmit={values => submitHandlerPass(values)}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                isValid,
                            }) => (
                                <>
                                    <Text>New Password</Text>
                                    <TextInput
                                        name="password"
                                        placeholder="password"
                                        style={styles.input}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}

                                        value={values.password}
                                    // onChangeText={handleChange('password')}
                                    // onBlur={handleBlur('password')}
                                    // value={values.password}
                                    />
                                    {errors.password &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    }
                                    <Text>Confirm Password</Text>
                                    <TextInput
                                        name="confirmPassword"
                                        placeholder="password"
                                        style={styles.input}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}

                                        value={values.confirmPassword}
                                    // onChangeText={handleChange('password')}
                                    // onBlur={handleBlur('password')}
                                    // value={values.password}
                                    />
                                    {errors.confirmPassword &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                                    }
                                    <Button
                                        title="change password"
                                        style={styles.button}
                                        onPress={handleSubmit}
                                    />
                                </>
                            )}
                        </Formik>

                    </>
                ) : null
            }

        </View>
    )

};


export const Login = ({ navigation }) => {
    const loginValidationSchema = yup.object().shape({
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
    });

    const { signIn } = React.useContext(AuthContext);

    const submitHandler = async (values) => {
        console.log('*******')
        console.log(values);
        try {
            let response = await axios.post('/auth/login', values);
            console.log(response.data.response)
            await AsyncStorage.setItem('token', response.data.response.token)
            Snackbar.show({
                text: 'Login Success',
                duration: Snackbar.LENGTH_LONG,
            });
            signIn()
        }
        catch (error) {
            console.log(error.response.data.message)
            let err = error.response.data.message;
            Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_LONG,
            });
        }

        // navigation.navigate('Home')
    };


    return (
        <View style={styles.container}>
            {/* <FlashMessage duration={5000}> */}
            {/* <strong>Hello to all will hide after 5 seconds!</strong>

                <Text style={styles.heading}>Login in to get Started</Text> */}

            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', password: '' }}
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

                        <Button
                            onPress={handleSubmit}
                            title="Login"
                            style={styles.button}
                            disabled={!isValid}
                        />

                        <Text style={styles.signup} onPress={() => navigation.navigate('Forgot Password')}>Forget Password?</Text>

                    </>
                )}
            </Formik>
            {/* </FlashMessage> */}
        </View>
    )

};


const Stack = createStackNavigator();

function RoottStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Home"
                component={Login}

            />
            <Stack.Screen
                name="Forgot Password"
                component={Forgotpass}

            />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
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
        width: 400,
        height: 44,
        padding: 10,
        borderColor: 'black',
        marginBottom: 2,
        fontWeight: '300'
    },
    heading: {
        width: 400,
        height: 44,
        padding: 10,
        borderColor: 'black',
        marginBottom: 2,
        fontWeight: 'bold',
        fontSize: 20
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

export default class Loginpage extends React.Component {
    render() {
        return <RoottStack />;
    }
}