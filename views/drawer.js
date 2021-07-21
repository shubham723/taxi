import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, addons } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from './authcontext';


import Home from './apphome';
import Profile from './profile';
import Balance from './wallet';
import Contact from './contactus';
import Bankaccount from './bankaccount';
import Neww from './tryviechle';
import Neww1 from './trydriver';
import Confirmed from './confirmed';
import Test from './test';
import Out from './signout';
import SLA from './agreement';
import panelty from './Panelty';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                {/*Donute Button Image */}
                <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

function firstScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="FirstPage">
            <Stack.Screen
                name="FirstPage"
                component={Home}
                options={{
                    title: 'HOME', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,

                    headerStyle: {
                        backgroundColor: '#0080ff', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style

                    },
                }}
            />
        </Stack.Navigator>
    );
}

function secondScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Profile}
          options={{
            title: 'Profile', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function thirdScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Confirmed}
          options={{
            title: 'Trip', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function fourthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Balance}
          options={{
            title: 'Wallet', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}


function fifthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="AddVehicle">
        <Stack.Screen
          name="AddVehicle"
          component={Neww}
          options={{
            title: 'Add Vehicle', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}


function sixthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Neww1}
          options={{
            title: 'Driver List', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}


function seventhScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Contact}
          options={{
            title: 'Contact us', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}


function eightScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Bankaccount}
          options={{
            title: 'Update Bank Account', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function nineScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={SLA}
          options={{
            title: 'Agreement', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function tenthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={panelty}
          options={{
            title: 'Panelty Charges', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function eleventhScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={Out}
          options={{
            title: 'Sign out', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function Apphomepage() {

    return (
        
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen
                    name="FirstPage"
                    options={{ drawerLabel: 'Home' }}
                    component={firstScreenStack} />
                 <Drawer.Screen
                    name="SecondPage"
                    options={{ drawerLabel: 'Profile' }}
                    component={secondScreenStack} />
                <Drawer.Screen
                    name="third page"
                    options={{ drawerLabel: 'My Trip' }}
                    component={thirdScreenStack} />
                <Drawer.Screen
                    name="fourth page"
                    options={{ drawerLabel: 'Wallet ' }}
                    component={fourthScreenStack} />
                <Drawer.Screen
                    name="fifth page"
                    options={{ drawerLabel: 'Vehicle List' }}
                    component={fifthScreenStack} />
                <Drawer.Screen
                    name="sixth page"
                    options={{ drawerLabel: 'Driver List' }}
                    component={sixthScreenStack} />
                <Drawer.Screen
                    name="seventh page"
                    options={{ drawerLabel: 'Contact Team' }}
                    component={seventhScreenStack} />
                <Drawer.Screen
                    name="eight page"
                    options={{ drawerLabel: 'Update Bank account' }}
                    component={eightScreenStack} />
                <Drawer.Screen
                    name="nine page"
                    options={{ drawerLabel: 'Agreement' }}
                    component={nineScreenStack} />
                    <Drawer.Screen
                    name="ten page"
                    options={{ drawerLabel: 'Panelty Charges' }}
                    component={tenthScreenStack} />
                    <Drawer.Screen
                    name="eleven page"
                    options={{ drawerLabel: 'Sign out' }}
                    component={eleventhScreenStack} />
                   
                    
                    
            </Drawer.Navigator>
        
    );
}

export default Apphomepage;