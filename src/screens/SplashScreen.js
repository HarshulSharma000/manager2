import React, { Component } from 'react';
import { View, Image, Dimensions, AsyncStorage } from 'react-native';
import firebase from 'firebase';

const SCREEEN_WIDTH = Dimensions.get('window').witdh;
 
class SplashScreen extends Component {
    async componentDidMount() {
        const token = await AsyncStorage.getItem('jwt');
        if (token != null) {
            this.props.navigation.navigate('Main');
        } else {
            this.props.navigation.navigate('Welcome');
        }
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Image 
                source={{ uri: 'http://www.best.org.mk/images/stories/vader404.jpg' }}
                style={{ height: 400, width: SCREEEN_WIDTH - 20 }} 
                />
            </View>
        );
    }
}

export default SplashScreen;
