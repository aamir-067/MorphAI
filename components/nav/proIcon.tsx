import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProIcon = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Try Pro</Text>
        </View>
    )
}

export default ProIcon

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 200
    },
    text: {
        color: "white",
        fontWeight: 600

    }
})