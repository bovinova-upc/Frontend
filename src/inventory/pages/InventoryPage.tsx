import { useEffect } from "react";
import { AddCategoryDialog } from "../components/AddCategoryDialog";
import { AddProductDialog } from "../components/AddProductDialog";
import { ProductList } from "../components/ProductList";
import { SearchBar } from "../components/SearchBar";
import { useInventoryStore } from "../stores/inventory-store";

export function InventoryPage() {
    const { setSearchQuery } = useInventoryStore();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="flex flex-col mx-20 gap-15">
            <SearchBar />
            <ProductList />
            <AddCategoryDialog />
            <AddProductDialog />
        </div >
    )
}