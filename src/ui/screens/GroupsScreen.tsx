import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import CustomImage from '../components/CustomImage';
import { Navigation } from 'react-native-navigation';
// import { loginRoot } from '../../navigation'
// import LocalStorage from '../../utils/localStorage';
// import { USER_TOKEN } from '../../utils/localStorage/constants';
import CustomText from '../components/CustomText';
import { logout } from '../../store/actions/user';
import CustomSwipeListView from '../components/CustomSwipeListView';
import FriendListItem from '../components/FriendListItem';
import { USER_PROFILE } from '../../navigation/constants';
import CustomTouchableOpacity from '../components/CustomTouchableOpacity';
import GroupListItem from '../components/GroupListItem';

const GroupsScreen = (props) => {
    const {
        userData,
        componentId
    } = props;

    return (
        <View style={styles.container}>
            <CustomSwipeListView
                data={userData.groups}
                renderItem={({ item }) => (<GroupListItem data={item} componentId={componentId} />)}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <CustomTouchableOpacity>
                            <CustomText>Add Members</CustomText>
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity>
                            <CustomText>DELETE</CustomText>
                        </CustomTouchableOpacity>
                    </View>
                )}
                leftOpenValue={100}
                rightOpenValue={-100}
            />
        </View>
    );
};

GroupsScreen.options = {
    topBar: {
        title: {
            text: 'Groups'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'cyan',
        borderRadius: 25,
        marginTop: 100,
    },
    logout: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    rowBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red',
        height: '100%'
    }
});


const mapStateToProps = state => ({
    userData: state.userData.data
});

const mapDispatchProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchProps)(GroupsScreen);
