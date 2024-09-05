import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function GeoMap() {
    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT');
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLocationData();
    }, []);

    const centerOnLocation = (latitude, longitude) => {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
            >
                {locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        pinColor="red"
                        title={location.name}
                        description={location.description}
                        onPress={() => Alert.alert(`${location.name}`, `${location.description}`)}
                    />
                ))}
            </MapView>
            <Button 
                title="Center on First Location" 
                onPress={() => locations.length && centerOnLocation(locations[0].latitude, locations[0].longitude)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GeoMap;
