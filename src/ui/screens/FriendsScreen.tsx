import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import CustomText from '../components/CustomText';
import { logout } from '../../store/actions/user';
import CustomSwipeListView from '../components/CustomSwipeListView';
import FriendListItem from '../components/FriendListItem';
import CustomTouchableOpacity from '../components/CustomTouchableOpacity';

const FriendsScreen = (props) => {
    const {
        userData,
        groupData,
        componentId
    } = props;
    const currentList = groupData ? groupData.members : userData.friends;
    return (
        <View style={styles.container}>
            <CustomSwipeListView
                data={currentList}
                renderItem={({ item }) => (<FriendListItem userData={item} componentId={componentId} />)}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.slideMenuContainer}>
                        <CustomTouchableOpacity>
                            <CustomText style={styles.slideMenuLabel}>Chat</CustomText>
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity>
                            <CustomText style={styles.slideMenuLabel}>Remove</CustomText>
                        </CustomTouchableOpacity>
                    </View>
                )}
                leftOpenValue={100}
                rightOpenValue={-100}
            />
        </View>
    );
};

FriendsScreen.options = {
    topBar: {
        title: {
            text: 'Friends'
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
    slideMenuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ff00ff99',
        height: '100%'
    },
    slideMenuLabel: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 15,
        fontSize: 15,
    },
});


const mapStateToProps = state => ({
    userData: state.userData.data
});

const mapDispatchProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchProps)(FriendsScreen);
