import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.single';

export default function styleConstructor(theme = {}) {
    const appStyle = {...defaultStyle, ...theme};
    return StyleSheet.create({
        base: {
            width: 32,
            height: 32,
            alignItems: 'center'
        },
        text: {
            marginTop: Platform.OS === 'android' ? 4 : 6,
            fontSize: appStyle.textDayFontSize,
            fontFamily: appStyle.textDayFontFamily,
            fontWeight: '300',
            color: appStyle.dayTextColor,
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        alignedText: {
            marginTop: Platform.OS === 'android' ? 4 : 6
        },
        dot: {
            width: 6,
            height: 6,
            position: 'absolute',
            bottom: 5,
            backgroundColor: 'white',
            borderRadius: 3,
        },
        range: {
            backgroundColor: 'rgba(255,255,255, 10)'
        },
        rangeStart: {
            borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,
            backgroundColor: 'rgba(255,255,255, 10)'
        },
        rangeEnd: {
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            backgroundColor: 'rgba(255,255,255, 10)'
        },
        rangeStartEnd: {
            borderRadius: 100,
            backgroundColor: 'rgba(255,255,255, 10)'
        },
        rangeStack: {
            backgroundColor: 'rgba(255,255,255, 10)'
        },
        selected: {
            backgroundColor: appStyle.selectedDayBackgroundColor,
            borderRadius: 16
        },
        today: {
            backgroundColor: appStyle.todayBackgroundColor
        },
        todayText: {
            color: appStyle.todayTextColor
        },
        selectedText: {
            color: appStyle.selectedDayTextColor
        },
        disabledText: {
            color: appStyle.textDisabledColor
        },
        ...(theme[STYLESHEET_ID] || {})
    });
}
