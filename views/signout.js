import React,{useEffect} from 'react';
import { AuthContext } from './authcontext';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';

const Out = ( () => {
    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        readData();
    }, );
    const readData = () => {
        signOut()
    }
    return(
        null
    )
    

});
export default Out;