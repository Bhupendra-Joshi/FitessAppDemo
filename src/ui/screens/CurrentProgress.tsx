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

const CurrentProgress = (props) => {
    const {
        data,
        isLoading,
        userData,
        friendData,
    } = props;

    const [stepsData, setStepsData] = useState([{ count: 0, target: 1 }]);
    const [pieChartData, setPieChartData] = useState(getPieChartColor(stepsData));
    const [currentUser, setCurrentUser] = useState(friendData || userData);

    useEffect(() => {
        setStepsData(currentUser.steps.sorted('date', true))
    }, [currentUser]);

    useEffect(() => {
        setPieChartData(getPieChartColor(stepsData[0]));
    }, [stepsData]);

    return (
        <CustomScrollView style={styles.container}>
            {
                (isLoading && data.length == 0)
                    ? <ActivityIndicator
                        size={'large'}
                    />
                    :
                    <View>
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
                            (currentUser.steps && currentUser.steps.length)
                                ? <View>
                                    <CustomText style={styles.availableTrucksLabel}>
                                        Previous Records
                                    </CustomText>
                                    <CustomFlatList
                                        data={stepsData}
                                        keyExtractor={item => item.id + ''}
                                        ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                                        renderItem={({ item }) => <StepsRecordItem stepsData={item} />}
                                    />
                                </View>
                                : null
                        }
                    </View>
            }
        </CustomScrollView>
    );
};

CurrentProgress.options = (props) => ({
    topBar: {
        title: {
            text: props.friendData ? props.friendData.name : 'My Progress'
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
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
    availableTrucksLabel: {
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
    // getUserData,
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentProgress);
