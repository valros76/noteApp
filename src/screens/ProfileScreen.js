import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { initProfileName, getProfileName, deleteProfileName } from '../shared/functions/AsyncFunctions';
import { getWidth, getHeight } from '../shared/constants/ScreenSize';

const screenWidth = getWidth();
const screenHeight = getHeight();

const ProfileScreen = () => {

    const [connectedUser, setConnectedUser] = useState("Invité");

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    deleteProfileName();

    initProfileName();

    const loadProfile = () => {
        getProfileName()
            .then((newUser) => {
                setConnectedUser(newUser)
            })
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Text style={styles.hello}>
                    Bonjour, {connectedUser}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={() => loadProfile()
                    }>
                    <Text style={styles.buttonText}>
                        Charger le profil de test
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        margin: 24,
        borderWidth: 1,
        padding: 32,
    },
    scrollView: {
        width: screenWidth,
        padding: 12,
    },
    hello: {
        textAlign: "center",
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: "#333",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 24,
    },
    buttonText: {
        textAlign: "center",
    },
})

export default ProfileScreen;