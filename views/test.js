import React from 'react';
import { Text } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Test = () => {
    return (
        <Card >
            <Card.Content>
                <Title>
                    <Text> <Icon name="circle-o" size={30} color="#900" /> item.from </Text> {"\n"}
                    <Text> <Icon name="map-marker" size={30} color="#900" /> item.to </Text>
                </Title>
                {/* <Paragraph>
                    <Icon name="money" width={33} size={30} color="#900" /> item.vendor_amount

                    <Icon name="taxi" size={30} color="#900" /> item.carCategory
                    <Icon name="info-circle" size={30} color="#900" /> item.paymentMode {"\n"}
                </Paragraph> */}
                <Paragraph>
                    item.remarks
                </Paragraph>
                <Paragraph>
                    <Icon name="check-square" size={30} color="#900" /> Departure: item.startDate {"\n"}
                

                </Paragraph>

            </Card.Content>
            <Card.Actions>


            </Card.Actions>
        </Card>
    
        
      
    )
}

export default Test;