import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import CustomFlatList from './CustomFlatList';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomImage from './CustomImage';
const height = Dimensions.get('window').height;
const CustomDropDown = (props: any) => {
    const {
        title = "sadhgjadhg",
        options = [1, 2],
        onOptionSelected,
    } = props;

    const [showOptions, setShowOptions] = useState(false);

    return (
        <View >
            <View>
                <CustomText
                    style={styles.title}
                    onPress={() => setShowOptions(true)}
                >
                    {title}
                </CustomText>
                <CustomImage />
            </View>
            <Modal
                visible={showOptions}
                style={styles.modal}
                onBackdropPress={() => { setShowOptions(false) }}
                onBackButtonPress={() => { setShowOptions(false) }}
            >
                <View style={styles.listContainer}>
                    <CustomFlatList
                        showsVerticalScrollIndicator={false}
                        data={options}
                        ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                        renderItem={
                            ({ item }) =>
                                <CustomTouchableOpacity
                                    onPress={() => {
                                        setShowOptions(false);
                                        onOptionSelected && onOptionSelected(item);
                                    }}
                                >
                                    <CustomText style={styles.optionLabel}>
                                        {item.label}
                                    </CustomText>
                                </CustomTouchableOpacity>
                        }
                    />
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    listContainer: {
        maxHeight: height / 3,
        padding: 10,
        backgroundColor: '#4ff',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    optionLabel: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        textAlign: 'center'
    },
    separator: {
        height: 0.5,
        backgroundColor: '#0000ff66',
        marginHorizontal: 20
    }
});

export default CustomDropDown