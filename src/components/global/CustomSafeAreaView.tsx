import { FC, ReactNode } from 'react';
import { SafeAreaView,View, StyleSheet, ViewStyle } from 'react-native';

interface CustomSafeAreaViewProps {
    children:ReactNode;
    style?:ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
    return (
    
        <View style={styles.container}>
            <SafeAreaView/>
                {children}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
export default CustomSafeAreaView;
