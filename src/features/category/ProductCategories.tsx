import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import Sidebar from './Sidebar';
import { getAllCategories } from '@service/productService';

const ProductCategories = () => {

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);
                const data = await getAllCategories();
                setCategories(data);
                if (data && data?.length > 0) {
                    setSelectedCategory(data[0]);
                }
            } catch (error) {
                console.log("Error fetching categories", error);
            }finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return (
        <View style={styles.mainContainer}>
            <CustomHeader title={selectedCategory?.name || 'Categories'} search />
            <View style={styles.subContainer}>
                {
                    categoriesLoading ? (
                        <ActivityIndicator size='small' color={Colors.border} />) :
(                        <Sidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryPress={(category: any) => setSelectedCategory(category)}
                        />
               ) }
            </View>

        </View>
    )
}

export default ProductCategories

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'

    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})