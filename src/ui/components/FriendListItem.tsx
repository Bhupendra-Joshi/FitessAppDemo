import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { Navigation } from 'react-native-navigation';
import { CURRENT_PROGRESS } from '../../navigation/constants';

interface FriendListItemProps {
    userData: {
        id: string,
        email: string,
        mobile: number,
        name: string,
        steps: any[]
    };
    componentId?: string
}

const FriendListItem = (props: FriendListItemProps) => {
    const {
        userData,
        componentId,
    } = props;
    const currentSteps = userData.steps.sorted('date', true)[0];

    const onItemClick = () => {
        Navigation.push(componentId, {
            component: {
                name: CURRENT_PROGRESS,
                id: CURRENT_PROGRESS,
                passProps: {
                    friendData: userData
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
                        {userData.name}
                    </CustomText>
                </View>
                <View style={styles.stepsContainer}>
                    <CustomText style={styles.stepsCount}>
                        {currentSteps.count}
                    </CustomText>
                    <CustomText style={styles.stepsTarget}>
                        /{currentSteps.target}
                    </CustomText>
                </View>
            </View>
            <View style={styles.separator} />
        </CustomTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
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
        fontSize: 30,
        fontWeight: 'bold',
        marginStart: 20,
    },
    stepsContainer: {
        marginStart: 20,
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    stepsCount: {
        fontSize: 25,
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

export default FriendListItem