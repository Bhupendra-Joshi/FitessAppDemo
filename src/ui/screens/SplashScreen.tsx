import React, {
    useEffect,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux'

import CustomImage from '../components/CustomImage';
import { Navigation } from 'react-native-navigation';
import { mainRoot, loginRoot } from '../../navigation'
import { getFromLocalStorage } from '../../utils/localStorage';
import { USER_TOKEN } from '../../utils/localStorage/constants';
import { saveData, deleteAll, getData, setUpFriendsListAndGroups } from '../../utils/databases';
import { getUserData } from '../../store/actions/user';
import UserSchema from '../../utils/databases/schemas/User';

const SplashScreen = (props) => {
    const {
        getUserData
    } = props;
    useEffect(() => {
        deleteAll(UserSchema);
        saveData(UserSchema, [
            {
                id: '1',
                email: 'a@a.com',
                mobile: '1111',
                name: 'Alex',
                password: '1111',
                currentTarget: 2000,
                token: 'qwertyuiop',
                steps: [
                    {
                        id: '11',
                        userId: '1',
                        date: 1591122600000,
                        count: 500,
                        target: 1500,
                    },
                    {
                        id: '12',
                        userId: '1',
                        date: 1591209000000,
                        count: 759,
                        target: 2000,
                    }
                ],
            },
            {
                id: '2',
                email: 'a@a.com',
                mobile: '1111',
                name: 'John',
                password: '1111',
                currentTarget: 2000,
                token: 'qwertyuiop',
                steps: [
                    {
                        id: '21',
                        userId: '1',
                        date: 1591122600000,
                        count: 500,
                        target: 1500,
                    },
                    {
                        id: '22',
                        userId: '1',
                        date: 1591209000000,
                        count: 1000,
                        target: 2000,
                    }
                ]
            },
            {
                id: '3',
                email: 'a@a.com',
                mobile: '1111',
                name: 'Tony',
                password: '1111',
                currentTarget: 2000,
                token: 'qwertyuiop',
                steps: [
                    {
                        id: '31',
                        userId: '1',
                        date: 1591122600000,
                        count: 500,
                        target: 1500,
                    },
                    {
                        id: '32',
                        userId: '1',
                        date: 1591209000000,
                        count: 759,
                        target: 2000,
                    }
                ]
            },
            {
                id: '4',
                email: 'b@b.com',
                mobile: '2222',
                name: 'Bob',
                password: '2222',
                currentTarget: 1000,
                token: 'asdfghjkl',
                steps: [
                    {
                        id: '41',
                        userId: '1',
                        date: 1591122600000,
                        count: 500,
                        target: 1500,
                    },
                    {
                        id: '42',
                        userId: '1',
                        date: 1591209000000,
                        count: 759,
                        target: 2000,
                    }
                ]
            }
        ]).then(result => {
            setUpFriendsListAndGroups();
        });

        const timeout = setTimeout(() => {
            getFromLocalStorage(USER_TOKEN)
                .then((token: string) => {
                    getUserData({ token });
                    Navigation.setRoot(token ? mainRoot : loginRoot)
                })
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <View style={styles.container}>
            <CustomImage
                style={styles.image}
                source={require('../../assets/images/logo/logo.png')}
            />
        </View>
    );
};

SplashScreen.options = {
    topBar: {
        visible: false,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    }

});

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
