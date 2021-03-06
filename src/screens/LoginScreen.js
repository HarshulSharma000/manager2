//@flow
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';


import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import { LoginAttempt, employeesFetch } from '../actions';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };
	
	componentWillMount() {
		const { email, password, error, loading } = this.props;
		this.setState({ email, password, error, loading });
	}

	async componentWillReceiveProps(nextProps) {
		const { email, password, error, loading, user } = nextProps;
		this.setState({ email, password, error, loading, user });
		if (user) {
			const token = await firebase.auth().currentUser.getToken();
			await AsyncStorage.setItem('jwt', token);
			this.props.employeesFetch();
			nextProps.navigation.navigate('Main');
		}
	}

	onButtonPress() {
		this.props.LoginAttempt(this.state.email, this.state.password);

	}

	renderButton() {
		if (this.props.loading) {
			return ( 
				<View style={{ marginTop: 30 }}>
					<Spinner size="large" />
				</View>
			);	
		}

		return (
			<CardSection>
				<Button onPress={this.onButtonPress.bind(this)}>
					Log In
				</Button>
			</CardSection>
		);
	}
	render() {
		return (
			<View>
				<CardSection>
					<Input
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
						label='Email:'
						keyboardType={'email-address'}
						placeholder='user@email.com'
					/>
				</CardSection>
				<CardSection>
					<Input
						placeholder="password"
						secureTextEntry
						label="Password:"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>
				<View>
					{this.renderButton()}
				</View>
				<View style={{ height: 40 }} />
				<View>
					<Text style={styles.errorTextStyle}>
						{this.state.error}
					</Text>
				</View>
			</View>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const auth = state.auth;
	return { ...auth };
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(mapStateToProps, { LoginAttempt,employeesFetch })(LoginForm);
