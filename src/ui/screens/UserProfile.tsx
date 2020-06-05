import React, {
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux'

import CustomText from '../components/CustomText';
import PieChart from '../components/PieChart';
import { STEPS_COMPLETED_COLOR, STEPS_REMAINING_COLOR } from '../../constants/colors';
import CustomFlatList from '../components/CustomFlatList';
import StepsRecordItem from '../components/StepsRecordItem';
import CustomScrollView from '../components/CustomScrollView';
import FriendListItem from '../components/FriendListItem';
import CustomTouchableOpacity from '../components/CustomTouchableOpacity';
import { logout } from '../../store/actions/user';
import LocalStorage from '../../utils/localStorage';
import { USER_TOKEN } from '../../utils/localStorage/constants';
import { Navigation } from 'react-native-navigation';
import { loginRoot } from '../../navigation';

const width = Dimensions.get('window').width - 100;

const getPieChartColor = (stepsData) => {
    const {
        count = 0,
        target = 1,
    } = stepsData;

    const completedPercent = count * 100 / target;

    return {
        sections: [
            {
                percentage: completedPercent,
                color: STEPS_COMPLETED_COLOR
            },
            {
                percentage: 100 - completedPercent,
                color: STEPS_REMAINING_COLOR,
            }
        ],
    }
}

const UserProfile = (props) => {
    const {
        data,
        isLoading,
        userData,
        friendData,
        componentId,
        logout,
    } = props;

    const [currentUserData, setCurrentUserData] = useState(friendData || userData);
    const [stepsData, setStepsData] = useState([{ count: 0, target: 1 }]);
    const [pieChartData, setPieChartData] = useState(getPieChartColor(stepsData));
    const [totalSteps, setTotalSteps] = useState(0);

    useEffect(() => {
        setStepsData(currentUserData.steps.sorted('date', true))
    }, [currentUserData]);

    useEffect(() => {
        setPieChartData(getPieChartColor(stepsData[0]));

        setTotalSteps(stepsData.reduce((total, item) => {
            return total + item.count
        }, 0));
    }, [stepsData]);

    const logoutUser = () => {
        LocalStorage.removeItem(USER_TOKEN);
        Navigation.setRoot(loginRoot);
        logout();
    }
    return (
        <CustomScrollView style={styles.container}>
            {
                (isLoading && data.length == 0)
                    ? <ActivityIndicator
                        size={'large'}
                    />
                    :
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomTouchableOpacity style={styles.pointsContainer}>
                                <CustomText>Redeem Points : {totalSteps}</CustomText>
                            </CustomTouchableOpacity>
                            <CustomTouchableOpacity
                                onPress={logoutUser}
                                style={styles.logoutButton}>
                                <CustomText>Logout</CustomText>
                            </CustomTouchableOpacity>
                        </View>
                        <View style={styles.pieChartContainer}>
                            <PieChart
                                radius={(width / 2 - 30)}
                                sections={pieChartData.sections}
                                strokeCap={'round'}
                                innerRadius={(width / 2 - 30) / 1.5}
                            />
                        </View>
                        <View style={styles.colorDetails}>
                            <View style={styles.colorRow}>
                                <View style={styles.colorBox(STEPS_COMPLETED_COLOR)} />
                                <CustomText>
                                    Steps count ({stepsData[0].count})
                                </CustomText>
                            </View>
                            <View style={styles.colorRow}>
                                <View style={styles.colorBox(STEPS_REMAINING_COLOR)} />
                                <CustomText>
                                    Steps remaining ({stepsData[0].target - stepsData[0].count})
                                </CustomText>
                            </View>
                        </View>
                        {
                            (currentUserData.friends && currentUserData.friends.length)
                                ? <View>
                                    <CustomText style={styles.friends}>
                                        Friends
                                    </CustomText>
                                    <CustomFlatList
                                        data={currentUserData.friends}
                                        keyExtractor={item => item.id + ''}
                                        renderItem={({ item }) => <FriendListItem userData={item} componentId={componentId} />}
                                    />
                                </View>
                                : null
                        }
                    </View>
            }
        </CustomScrollView>
    );
};

UserProfile.options = {
    topBar: {
        title: {
            text: 'User Profile'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    pointsContainer: {
        backgroundColor: '#0000ff33',
        padding: 10,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#ff000033',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    pieChartContainer: {
        alignItems: 'center',
    },
    colorDetails: {
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    colorBox: (color: string) => ({
        height: 20,
        width: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: color,
        marginEnd: 10,
    }),
    friends: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#0000ff66',
        marginHorizontal: 20
    }
});



const mapStateToProps = state => ({
    userData: state.userData.data
});

const mapDispatchToProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
