import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import theme from '../utils/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { globalStyles } from '../utils/GlobalStyles';

const CustomDropdown = ({
    data,
    label,
    placeholderText,
    value,
    setValue,
    extraProp,
    extraProp2,
    onValueChange,
    notfilled,
    extraProp3,
    width,
    focus = true,
    noborder,
    mandatory,
    errorMessage,
    iconName,
    iconfrom,
    iconSize,
    iconColor,
    iconLocation = 'left',
    dropdownStyles,
    containerStyles,
    labelStyles,
    labelTextStyles,
    placeholderStyle,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const shakeAnimationValue = useMemo(() => new Animated.Value(0), []);
    const slideAnimationValue = useMemo(() => new Animated.Value(0), []);

    const startShakeAnimation = useCallback(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnimationValue, {
                    toValue: 10,
                    duration: 50,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimationValue, {
                    toValue: -10,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimationValue, {
                    toValue: 10,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimationValue, {
                    toValue: 0,
                    duration: 50,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [shakeAnimationValue]);

    const startSlideAnimation = useCallback(() => {
        Animated.timing(slideAnimationValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [slideAnimationValue]);

    const interpolatedShakeAnimation = shakeAnimationValue.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0deg', '0deg'],
    });

    const slideAnimation = slideAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 15],
    });

    const renderItem = useCallback((item) => {
        return (
            <View style={styles.item}>
                <Text style={[globalStyles.text2]}>{item.label}</Text>
            </View>
        );
    }, []);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const renderIcon = useMemo(() => {
        switch (iconfrom) {
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcon name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'AntDesign':
                return <AntDesign name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Entypo':
                return <Entypo name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'EvilIcons':
                return <EvilIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Feather':
                return <Feather name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'FontAwesome':
                return <FontAwesome name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'FontAwesome5Pro':
                return <FontAwesome5Pro name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'FontAwesome6':
                return <FontAwesome6 name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Foundation':
                return <Foundation name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Ionicons':
                return <Ionicons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'MaterialIcons':
                return <MaterialIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Octicons':
                return <Octicons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'SimpleLineIcons':
                return <SimpleLineIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            case 'Zocial':
                return <Zocial name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} />;
            default:
                return null;
        }
    }, [iconfrom, iconName, iconSize, iconColor]);

    return (
        <View style={{ width: width ? width : '100%', marginBottom: 10 }}>
            {label && (
                <View style={[{ flexDirection: 'row', marginBottom: 5 }, labelStyles]}>
                    <Text style={[globalStyles.text2, labelTextStyles]}>{label}</Text>
                    {mandatory && <Text style={{ color: 'red', marginLeft: 3 }}>*</Text>}
                </View>
            )}
            <View style={[
                styles.dropdown,
                !noborder && {
                    borderColor: notfilled ? 'red' : 'black',
                    borderRadius: 10,
                    // borderWidth: isFocused || (errorMessage && !value) ? 1 : .5,
                    backgroundColor: isFocused ? '#fff5dd' : '#f0f1f2ff',
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                },
                dropdownStyles,
            ]}>
                <View style={{ position: 'absolute', left: 20 }}>
                    {iconLocation === 'left' && renderIcon}
                </View>
                <Dropdown
                    style={{ width: '100%', paddingLeft: iconName ? (iconLocation == "right" ? 35 : 50) : 30, paddingRight: iconName ? (iconLocation == "right" ? 50 : 20) : 20 }}
                    placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    activeColor={theme.colors.inProgress}
                    data={data}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholderText}
                    searchPlaceholder="Search..."
                    onFocus={focus ? handleFocus : null}
                    onBlur={focus ? handleBlur : null}
                    value={value}
                    onChange={onValueChange ? (e) => onValueChange(e) : (item) => {
                        setValue({
                            label: item.label,
                            value: item.value,
                            [extraProp]: item[extraProp],
                            [extraProp2]: item[extraProp2],
                            [extraProp3]: item[extraProp3],
                        });
                    }}
                    renderItem={renderItem}
                    containerStyle={[styles.dropdownContainer, containerStyles]}
                />
                <View style={{ position: 'absolute', right: 20 }}>
                    {iconLocation === 'right' && renderIcon}
                </View>
            </View>
            {errorMessage && !value && (
                <Animated.Text style={[styles.errorText, { transform: [{ rotate: interpolatedShakeAnimation }, { translateX: slideAnimation }] }]}>
                    {errorMessage}
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 48,
        color: 'black',
        borderRadius: 10,
        // borderWidth: 0.5,
        marginBottom: 12,
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholderStyle: {
        fontSize: 14,
        color: "rgba(0,0,0,.5)",
    },
    selectedTextStyle: {
        fontSize: 14,
        color: theme.colors.textinputValue,
        color: 'black',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: theme.colors.textInputBackground,
        borderRadius: 10,
        borderColor: 'transparent',
        color: 'black',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderColor: 'transparent',
        elevation: 2,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 15,
        paddingTop: 5,
        paddingBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CustomDropdown;
