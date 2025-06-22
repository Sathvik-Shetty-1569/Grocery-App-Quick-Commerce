import { Colors, Fonts } from '@utils/Constants'
import { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
    variant?:
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
    fontFamily?: Fonts;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number;
    onLayout?: (event: object) => void;
}



const CustomText: FC<Props> = ({
    variant = "body",
    fontFamily = Fonts.Regular,
    fontSize,
    style,
    children,
    numberOfLines,
    onLayout,
    ...props
}) => {

    let compuutedFontSize: number;

    switch (variant) {
        case 'h1':
            compuutedFontSize = RFValue(fontSize || 22);
            break;
        case 'h2':
            compuutedFontSize = RFValue(fontSize || 20);
            break;
        case 'h3':
            compuutedFontSize = RFValue(fontSize || 18);
            break;
        case 'h4':
            compuutedFontSize = RFValue(fontSize || 16);
            break;
        case 'h5':
            compuutedFontSize = RFValue(fontSize || 14);
            break;
        case 'h6':
            compuutedFontSize = RFValue(fontSize || 12);
            break;
        case 'h7':
            compuutedFontSize = RFValue(fontSize || 12);
            break;
        case 'h8':
            compuutedFontSize = RFValue(fontSize || 10);
            break;
        case 'h9':
            compuutedFontSize = RFValue(fontSize || 9);
            break;
        case 'body':
            compuutedFontSize = RFValue(fontSize || 12);
            break;
    }

    const fontFamilyStyle = {
        fontFamily
    }

    return (
        <Text onLayout={onLayout}
            style={[styles.text, fontFamilyStyle, { color: Colors.text, fontSize: compuutedFontSize },style]}
            numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}>
            {children}
        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',

    }
})