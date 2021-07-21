import React from 'react';
import { TextInput, StyleSheet, Text, View, Button, Linking, Platform } from 'react-native';
const Contact = () => {
    
    const dialCall = () => {
  
      let phoneNumber = '';
  
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${+917347372702}';
      }
      else {
        phoneNumber = 'telprompt:${+917347372702}';
      }
  
      Linking.openURL(phoneNumber);
    };
    return (

        <View style={styles.container}>
            <Text style={styles.texttt}>Email ID: sdindiataxibazaar@gmail.com</Text>
            <Button
                style={styles.butt} 
                title="Call Customer Care"
                onPress={dialCall}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    butt: {
        
        
        

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
        height: '100%',
    },
    texttt: {
        fontSize: 19,
        paddingBottom: 50,
        padding: 5
    }


});

export default Contact;