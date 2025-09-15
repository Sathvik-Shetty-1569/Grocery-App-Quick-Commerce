import React from 'react';
import { View, StyleSheet } from 'react-native';
import { screenHeight } from '@utils/Scaling';
import { Colors } from '@utils/Constants';

const ProductSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer} />
            <View style={styles.content}>
                <View style={styles.textLine} />
                <View style={[styles.textLine, { width: '60%' }]} />
                <View style={styles.priceContainer}>
                    <View style={[styles.textLine, { width: '40%' }]} />
                    <View style={styles.buttonSkeleton} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        marginLeft: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        height: screenHeight * 0.14,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        margin: 12,
        width: '80%',
        alignSelf: 'center'
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    textLine: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginVertical: 3,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginTop: 'auto'
    },
    buttonSkeleton: {
        width: 60,
        height: 25,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    }
});

export default ProductSkeleton;
