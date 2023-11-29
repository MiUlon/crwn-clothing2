import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
        </Routes>
    );
};

export default Shop;