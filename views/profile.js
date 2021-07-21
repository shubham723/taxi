import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../instances/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({route,navigation}) => {
    console.log(rout
        )
    const [user, setUser] = useState({});

    useEffect(() => {
        // loadUser();
        navigation.addListener('focus', () => {
            readData();
          });
        
    }, [navigation]);

    

    const readData = async () => {
        try {
            // await AsyncStorage.removeItem('token')
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get('/user/profile', {
                headers: {
                    'token': userAge
                }
            });
            setUser(response.data.response)
            console.log(response.data)
        } catch (e) {
            // alert('Failed to fetch the data from storage')
        }
    }

  

    
    return (
        <ScrollView style={styles.mama}>
            <View style={styles.container}>

                <Text h1 style={styles.heading}>Personal Details</Text>
                <View>
                    <Text style={styles.innerhead}>Name</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.userData && user.userData.name ? user.userData.name : 'N/A'}

                    />

                    <Text style={styles.innerhead}>Email</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.userData && user.userData.email ? user.userData.email : 'N/A'}
                    />
                    <Text style={styles.innerhead}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.userData && user.userData.phoneNumber ? user.userData.phoneNumber : 'N/A'}

                    />
                    <Text style={styles.innerhead}>Adhaar Number</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.userData && user.userData.aadharNumber ? user.userData.aadharNumber : 'N/A'}
                    />
                    <Text style={styles.innerhead}>PAN Number</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.userData && user.userData.panNumber ? user.userData.panNumber : 'N/A'}
                    />
                    <Text style={styles.innerhead}>Profile Category</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={'Vendor'}
                    />
                </View>

                <Text h1 style={styles.heading}>Bank Details</Text>
                <View>
                    <Text style={styles.innerhead}>Account Holder Name</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.bankDetail && user.bankDetail.accountName ? user.bankDetail.accountName : 'N/A'}
                    />
                    <Text style={styles.innerhead}>Bank Name</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.bankDetail && user.bankDetail.bankName ? user.bankDetail.bankName : 'N/A'}
                    />

                    <Text style={styles.innerhead}>Account Number</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.bankDetail && user.bankDetail.accountNumber ? user.bankDetail.accountNumber : 'N/A'}
                    />

                    <Text style={styles.innerhead}>IFSC Code</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.bankDetail && user.bankDetail.IFSCCode ? user.bankDetail.IFSCCode : 'N/A'}
                    />
                    <Text style={styles.innerhead}>Branch Name</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={user && user.bankDetail && user.bankDetail.branchName ? user.bankDetail.branchName : 'N/A'}
                    />
                </View>


            </View>

        </ScrollView>



    );

};

const styles = StyleSheet.create({
    innercon: {
        backgroundColor: 'white',
        borderRadius: 25,
        margin: '10px',
        padding: '20px',

    },
    heading: {
        paddingBottom: 30,
        textDecorationLine: 'underline',
    },
    mama: {
        backgroundColor: '#d9dada',
    },
    innerhead: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',




    },
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
        paddingTop: 60,

    },
    input: {
        width: 330,
        height: 44,
        padding: 6,

        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },

});

export default Profile;