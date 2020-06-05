import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
import { formatDate } from '../../utils/dateTime';

interface StepsRecordItemProps {
    stepsData: {
        id: number,
        count: string,
        target: string,
        date: number,
    };
    onItemClick?: () => void;
}

const StepsRecordItem = (props: StepsRecordItemProps) => {
    const {
        stepsData,
        onItemClick
    } = props;
    return (
        <CustomTouchableOpacity
            style={styles.container}
            onPress={onItemClick}
        >
            <View style={styles.detailsContainer}>
                <CustomText style={styles.stepsCount}>
                    {stepsData.count}
                </CustomText>
                <CustomText style={styles.stepsTarget}>
                    /{stepsData.target}
                </CustomText>
            </View>
            <CustomText style={styles.driver}>
                {formatDate(stepsData.date)}
            </CustomText>
        </CustomTouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    stepsCount: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    stepsTarget: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    driver: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 12,
    },
    maxPayloadContainer: {
        flex: 0.4,
        borderRadius: 15,
        backgroundColor: '#ffff00',
        justifyContent: 'center',
        borderWidth: 1
    },
    maxPayload: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default StepsRecordItem