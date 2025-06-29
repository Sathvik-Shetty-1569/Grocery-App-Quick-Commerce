import { FC, ReactNode } from 'react';
import { SafeAreaView,View, StyleSheet, ViewStyle } from 'react-native';

interface CustomSafeAreaViewProps {
    children:ReactNode;
    style?:ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
    return (
    
        <SafeAreaView style={[styles.container, style]}>
            <View style={[styles.container, style]}>
                {children}
            </View>
            </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
export default CustomSafeAreaView;
