import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import axios from '../instances/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationEvents } from 'react-navigation';


const Confirmed = ({props,navigation}) => {
    const [card, setcard] = useState([]);

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
    // const setState = () =>{
    //     console.log('hi')
    //  }

    console.log(card);

    return (
        <View>

            {
                card.map(item => {
                    return (
                        

                        <Card style={{margin:10,marginTop:15}} onPress={() => navigation.navigate('Booking Detail', { id: item.id })}>
                            <Card.Content>
                                <Title>
                                    <Text style={{ textTransform:'uppercase'}}><Icon name="circle-o" size={30} color="#900" /> {item.from} </Text>{"\n"}
                                    <Text style={{ textTransform:'uppercase'}}><Icon name="map-marker" size={30} color="#900" /> {item.to}</Text>
                                </Title>
                                <Paragraph>
                                <Text><Icon name="money" width={33} size={20} color="#900" /> Rs.{item.vendor_amount}</Text>
                                </Paragraph><Paragraph>
                                <Text><Icon name="taxi" size={20} color="#900" /> Start Date:{item.startDate}     </Text>
                                <Text><Icon name="info-circle" size={20} color="#900" /> Return Date:{item && item.returnDate ? item.returnDate : 'N/A'}</Text> {"\n"}
                                </Paragraph>

                            </Card.Content>
                            <Card.Actions>


                            </Card.Actions>
                        </Card>
                    )
                })
            }
        </View>
    );
};

const cardclick = ({route}) => {
    const [booking, setBooking] = useState({});
    const { id } = route.params;


    useEffect(() => {
        loadBooking();
    }, []);

    const loadBooking = async () => {
        try {
            const userAge = await AsyncStorage.getItem('token');
            console.log(userAge)
            // setToken(userAge)
            // console.log(headers)
            let response = await axios.get(`/booking-detail/${id}`, {
                headers: {
                    'token': userAge
                }
            });
            setBooking(response.data.response)
            console.log(response.data)
        }
        catch (error) {

        }
    };
    console.log(booking);
    


    return (
        <View style={{margin:15}}>
                            {/* <NavigationEvents onDidFocus={() => setState({})} /> */}

            <Text style={{fontSize:20,fontWeight:'bold',marginLeft:90}}>{booking.type} | B.NO :- {booking.booking_id}</Text>
            <Text style={{ textTransform:'uppercase'}}> <Icon name="circle-o" size={30} color="#900" />  {booking.from} </Text>
            <Text style={{ textTransform:'uppercase'}}> <Icon name="map-marker" size={30} color="#900" /> {booking.to} </Text>
            <Text> <Icon name="money" width={33} size={30} color="#900" /> {booking.vendor_amount} </Text>

            <Text> <Icon name="taxi" size={30} color="#900" /> {booking.carCategory} </Text>
            <Text> <Icon name="info-circle" size={30} color="#900" /> {booking.paymentMode} </Text>
            <Text> <Icon name="check-square" size={30} color="#900" /> Start: {booking.startDate} </Text>
            <Text> <Icon name="check-square" size={30} color="#900" /> Return Date: {booking && booking.returnDate ? booking.returnDate : 'N/A'} </Text>
            <Text>Start Time:{booking.time}</Text>
            <Text>Remarks :{booking.remarks}</Text>

        </View>
    )

};


const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Trip"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Trip"
                component={Confirmed}

            />
            <Stack.Screen
                name="Booking Detail"
                component={cardclick}

            />

        </Stack.Navigator>
    );
}
export default class confirmbooking extends React.Component {
    render() {
        return <RootStack />;
    }
};