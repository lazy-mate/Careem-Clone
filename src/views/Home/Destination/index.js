import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

function Destination() {

    const [location, setLocation] = useState({
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    });
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ ...location, latitude, longitude });
            console.log(location)

        })();
    }, []);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MapView
                region={location}
                style={styles.map}
                loadingEnabled={true}
            >
                <Marker
                    coordinate={location}
                    title={'Truama'}
                    description={'Hospital'} />
            </MapView>
            <Button
            onPress={()=> navigation.navigate('PickUp')}
            title={'Select'}
            />
        </View>
    );
}
//FourSquare API Key :fsq32U4wFZ0SN5h3EiLTQ6+v/ZeuIJgSFnI0cwuhJcs4BQw=

export default Destination;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '80%',
    }
})