import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const panelty = () => {

    const tableHead = ['S.No.', 'Cancellation of booking after accepting it', 'Panelty'];
    const tableData = [
        ['1', 'In case of cancellation before 12 hours of departure time', 'RS 300'],
        ['2', 'In case of cancellation Within 6 hours of departure time', 'RS 500'],
        ['3', 'In case of cancellation Within 2 hours of departure time', 'RS 1000'],
    ];

    // hindi edition
    // const tableHead2 = ['S.No.', 'बुकिंग स्वीकार करने के बाद रद्द करना (Cancellation)', 'भुगतान'];
    // const tableData2 = [
    //     ['1', 'प्रस्थान से 12 घंटे पहले Cancellation', '300 RS'],
    //     ['2', 'प्रस्थान के 6 घंटे के भीतर cancellation', '500 RS'],
    //     ['3', 'प्रस्थान के 2 घंटे के भीतर cancellation', '1000 RS'],
    // ];




    return (

        <ScrollView style={{ marginTop: 30 ,padding:10}}>
            <View>
                <Text>Dear Partner,</Text>
                <Text></Text>
                <Text>Please go through the below list very carefully and take care of providing the best service to customer, to avoid any penalties being charged to your account.</Text>
<Text></Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                    <Row data={tableHead} />
                    <Rows data={tableData} />
                </Table>
<Text></Text>
                <Text>SD India Taxi Bazaar will take reasonable steps to ensure the occurrence of inappropriate action so that nobody gets wrongly penalised. SD India Taxi Bazaar reserves the authority to take final decision on this.</Text>
  <Text> </Text>
             <Text>Thanks & Regards.</Text>
                 <Text>Team SD India Taxi Bazaar</Text>
                {/* hindi edition*/}
                {/* <Text>प्रिय ग्राहक</Text>
                <Text>कृपया नीचे दी गई सूची को बहुत सावधानी से देखें और ग्राहक को सबसे अच्छी सेवा प्रदान करने का ख्याल रखें, ताकि आपके खाते में कोई Penalty लगे ।।</Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                    <Row data={tableHead2} />
                    <Rows data={tableData2} />
                </Table>

                <Text>SD India Taxi Bazaar अनुचित कार्रवाई की घटना को सुनिश्चित करने के लिए उचित कदम उठाएगा जिससे कि कोई गलत तरीके से दंडित न हो। SD India Taxi Bazaar इस पर अंतिम निर्णय लेने का अधिकार रखता है।</Text>

                <Text>सादर धन्यवाद, टीम SD India Taxi Bazaar</Text> */}

            </View>
        </ScrollView>
    )
};
const StyleSheet = {

}
export default panelty;