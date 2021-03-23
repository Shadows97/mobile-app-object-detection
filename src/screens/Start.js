import React, { Component } from 'react'
import {  View, StyleSheet, Dimensions  } from 'react-native'
import { Button, Text } from '@ui-kitten/components';

export default class Start extends Component {

    constructor(props){
        super(props)
    }
    goToHome = () => {
        console.log("object")
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Image recognition </Text>
                <Button 
                style={styles.button}
                onPress={this.goToHome}
                >
                        START
                </Button>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#05676D",
        borderColor: '#05676D',
        width: Dimensions.get('screen').width/1.5,
        borderRadius: 10,
        marginTop: 10
    },
    text: {
        fontSize: 17,
        marginBottom: 20,
        color: 'white',
    }
})
