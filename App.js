import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './views/rajorpay';
import Login from './views/login';
import Signup from './views/signup';
import Test from './views/test';
import Apphomepage from './views/drawer';
import { AuthContext } from './views/authcontext';



const Tab = createBottomTabNavigator();

const App = () => {
  // console.log(AsyncStorage.getItem('token'));
  const [auth, setAuth] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // const userAge = await AsyncStorage.getItem('token');
  // console.log(userAge);

  const authContext = useMemo(() => ({
    signIn: () => {
      // AsyncStorage.removeItem('token');
      console.log('5455')
      // setUserToken(null);
      setAuth(true);
    },
    signOut: () => {
      setAuth(false);
      AsyncStorage.removeItem('token')
    }
  }))

  // const logo = {
  //   uri: 'https://reactnative.dev/img/tiny_logo.png',
  //   width: 64,
  //   height: 64
  // };


  // useEffect(() => {
  //   storeToken();
  // }, []);


  useEffect(() => {
    readData();
  }, []);

  // const storeToken = async () => {
  //   try {
  //     let res = await AsyncStorage.setItem('k', 'value');
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  const readData = async () => {
    // try {
      // await AsyncStorage.removeItem('token')
      const userAge = await AsyncStorage.getItem('token');
      // console.log('s', userAge)
      if (userAge !== null) {
        setAuth(true)
      }
    // } catch (e) {
    //   // alert('Failed to fetch the data from storage')
    // }
  }
  // console.log(AsyncStorage.getItem('token'))


  return (
    <>
      <AuthContext.Provider value={authContext}>
        {auth ? (
          <NavigationContainer>
            <Apphomepage /></NavigationContainer>
        )
          :
          <NavigationContainer>
            
            <Tab.Navigator initialRouteName="Login">
              <Tab.Screen name="Login" component={Login} />
              <Tab.Screen name="Signup" component={Signup} />
            </Tab.Navigator>
          </NavigationContainer>

        }
      </AuthContext.Provider>

    </>
  )

}


export default App;
