import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { Navigation } from 'react-native-navigation';
import { USER_PROFILE, FRIENDS_LIST } from '../../navigation/constants';

interface FriendListItemProps {
    data: {
        id: string,
        name: string,
        members: any[],
    };
    componentId?: string
}

const GroupListItem = (props: FriendListItemProps) => {
    const {
        data,
        componentId,
    } = props;

    const onItemClick = () => {
        Navigation.push(componentId, {
            component: {
                name: FRIENDS_LIST,
                id: FRIENDS_LIST,
                passProps: {
                    groupData: data,
                }
            }
        });
    }
    return (
        <CustomTouchableOpacity
            style={styles.container}
            onPress={onItemClick}
        >
            <View style={styles.detailsContainer}>
                <View style={styles.profileContainer}>
                    <CustomImage
                        style={styles.image}
                        source={require('../../assets/images/profile/userProfile.png')} />
                    <CustomText style={styles.name}>
                        {data.name}
                    </CustomText>
                </View>
                <CustomText style={styles.membersCount}>
                    {data.members.length} Members
                    </CustomText>
            </View>
            <View style={styles.separator} />
        </CustomTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,

    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginStart: 20,
    },
    stepsContainer: {
        marginStart: 20,
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    membersCount: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    stepsTarget: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    separator: {
        height: 0.5,
        marginTop: 20,
        backgroundColor: '#00000055'
    }
})

export default GroupListItem