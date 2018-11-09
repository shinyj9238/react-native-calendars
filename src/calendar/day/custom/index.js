import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor from './style';
import {shouldUpdate} from '../../../component-updater';

class Day extends Component {
    static propTypes = {
        // TODO: disabled props should be removed
        state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),
        rangeState: PropTypes.oneOf(['range', 'rangeStart', 'rangeEnd', 'rangeStartEnd', 'rangeStack', '']),

        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme: PropTypes.object,
        marking: PropTypes.any,
        onPress: PropTypes.func,
        date: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.style = styleConstructor(props.theme);
        this.onDayPress = this.onDayPress.bind(this);
        this.onDayLongPress = this.onDayLongPress.bind(this);
    }

    onDayPress() {
        this.props.onPress(this.props.date);
    }

    onDayLongPress() {
        this.props.onLongPress(this.props.date);
    }

    shouldComponentUpdate(nextProps) {
        return shouldUpdate(this.props, nextProps, ['state', 'rangeState', 'children', 'marking', 'onPress', 'onLongPress']);
    }

    render() {
        let baseStyle = [this.style.base];
        let textStyle = [this.style.text];
        let containerStyle = [this.style.base];

        let marking = this.props.marking || {};
        if (marking && marking.constructor === Array && marking.length) {
            marking = {
                marking: true
            };
        }
        const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';

        if (this.props.rangeState === 'range') {
            baseStyle.push(this.style.range);
        } else if (this.props.rangeState.includes('range')) {
            baseStyle.push(this.style[this.props.rangeState]);
        }

        if (isDisabled) {
            textStyle.push(this.style.disabledText);
        }

        if (this.props.state === 'today') {
            containerStyle.push(this.style.today);
            textStyle.push(this.style.todayText);
        }

        if (marking.selected) {
            containerStyle.push(this.style.selected);
            textStyle.push(this.style.selectedText);
        }

        if (marking.customStyles && typeof marking.customStyles === 'object') {
            const styles = marking.customStyles;
            if (styles.container) {
                if (styles.container.borderRadius === undefined) {
                    styles.container.borderRadius = 16;
                }
                containerStyle.push(styles.container);
            }
            if (styles.text) {
                textStyle.push(styles.text);
            }
        }

        return (
            <View style={baseStyle}>
                <TouchableOpacity
                    style={containerStyle}
                    onPress={this.onDayPress}
                    onLongPress={this.onDayLongPress}
                    activeOpacity={marking.activeOpacity}
                    disabled={marking.disableTouchEvent}
                >
                    <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
                </TouchableOpacity>

                {marking.dot && <View style={this.style.dot}/>}
            </View>
        );
    }
}

export default Day;
