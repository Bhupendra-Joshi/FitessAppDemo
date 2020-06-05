import React from 'react';
import { TouchableOpacity } from 'react-native';

const CustomTouchableOpacity = (props: any) =>
    <TouchableOpacity
        activeOpacity={1}
        {...props} />

export default CustomTouchableOpacity;