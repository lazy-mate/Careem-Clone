import React, { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, Button, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";


function PickUp() {
    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
    })
    const [errorMsg, setErrorMsg] = useState(null)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                distanceInterval: 0.1,
                timeInterval: 100,
            }, (response) => {
                const { coords: { latitude, longitude } } = response
                setLocation({ ...location, latitude, longitude })
            })
        })();
    }, []);

const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MapView
                region={location}
                style={styles.map}
            >
                <Marker
                    coordinate={location}
                    title={'Stadium'}
                    description={'Bara wala stadium'}
                />
            </MapView>
            <Button
                onPress={() => navigation.navigate('CarSelection')}
                title={'Confirm Pick Up'}
            />
        </View>
    );
}

export default PickUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '80%'
    }
})