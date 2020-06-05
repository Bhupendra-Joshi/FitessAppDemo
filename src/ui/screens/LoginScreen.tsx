import React, {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { mainRoot } from '../../navigation'
import { authenticateUser } from '../../store/actions/user';
import CustomTextInput from '../components/CustomTextInput';
import CustomTouchableOpacity from '../components/CustomTouchableOpacity';
import CustomText from '../components/CustomText';
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/localStorage";
import { USER_TOKEN } from '../../utils/localStorage/constants';

const LoginScreen = (props) => {
    const {
        userData,
        authenticateUser,
        isLoading,
        error,
    } = props;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginRequest = () => {
        if (userName.trim().length > 0 && password.trim().length > 0) {
            authenticateUser({ userName, password });
        } else {
            alert("Entered User Email/ RMN or password is incorrect.")
        }
    }

    useEffect(() => {
        if (userData.token) {
            saveToLocalStorage(USER_TOKEN, userData.token)
                .then(() => {
                    Navigation.setRoot(mainRoot);
                })
        }
    }, [userData]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <CustomTextInput
                    placeholder={"User Email/ RMN"}
                    style={styles.inputBox}
                    onChangeText={userName => setUserName(userName)}
                />

                <CustomTextInput
                    placeholder={"Password"}
                    secureTextEntry={true}
                    style={styles.inputBox}
                    onChangeText={password => setPassword(password)}
                />
                <CustomText style={styles.error}>
                    {error || " "}
                </CustomText>

                <CustomTouchableOpacity
                    style={styles.loginButton}
                    onPress={loginRequest}
                >
                    <CustomText>
                        LOGIN
                    </CustomText>
                </CustomTouchableOpacity>
                <ActivityIndicator
                    size={'large'}
                    animating={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

LoginScreen.options = {
    topBar: {
        visible: false,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 150,
    },
    inputBox: {
        height: 50,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 25,
        paddingHorizontal: 20,
    },
    error: {
        fontSize: 15,
        color: 'red',
    },
    loginButton: {
        backgroundColor: '#ff0f99',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 20,
    }
});

const mapStateToProps = state => ({
    isLoading: state.userData.isLoading,
    userData: state.userData.data,
    error: state.userData.error,
});

const mapDispatchToProps = {
    authenticateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

