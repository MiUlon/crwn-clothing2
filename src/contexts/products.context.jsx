import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        };

        getCategoryMap();
    }, []);

    const value = { products, setProducts };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};