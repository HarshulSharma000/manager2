import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { TabNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import firebase from 'firebase';

import Routes from './config/routes';

import getStore from './store';

console.disableYellowBox = true;

const AppNavigator = TabNavigator(Routes, {
    lazy: true,
    swipeEnabled: false,
    navigationOptions: {
            tabBarVisible: true
    },
    tabBarOptions: { 
        style: { 
            marginTop: 24 
        } 
    } 
});

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

@connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends Component {
    componentWillMount() {
         // Initialize Firebase
        const config = {
            apiKey: 'AIzaSyDlW1K-pRC3wnzw6XBdI_7hCzaQ1iQAGgw',
            authDomain: 'manager-792a4.firebaseapp.com',
            databaseURL: 'https://manager-792a4.firebaseio.com',
            projectId: 'manager-792a4',
            storageBucket: 'manager-792a4.appspot.com',
            messagingSenderId: '687366841744'
        };
        firebase.initializeApp(config);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        //console.log('nav', nav.index);
        //if (nav.index === 0) {
        //    BackHandler.exitApp();
        //}
        if (nav.routes[3].index === 0) {
            BackHandler.exitApp();
            return true;
        }
        dispatch(NavigationActions.back());
        //console.log('nav', nav);
        return true;
    };

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const store = getStore(navReducer);

export default function Root() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}
