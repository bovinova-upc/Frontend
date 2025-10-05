import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "../model/Product";
import { Category } from "../model/Category";

interface InventoryState {
    // Filtering
    searchQuery: string;
    categoryFilter?: number;
    setSearchQuery: (query: string) => void;
    setCategoryFilter: (category?: number) => void;
    filterProducts: (products: Product[]) => void;
    filteredProducts: Product[];
    isFiltered: boolean;

    // Modal & New Category
    isOpenModalCategory: boolean;
    toggleModalCategory: () => void;
    newCategory: Category;
    setNewCategory: (category: Partial<Category>) => void;
    resetNewCategory: () => void;

    // Modal & New Product
    isOpenModalProduct: boolean;
    toggleModalProduct: () => void;
    newProduct: Product;
    setNewProduct: (product: Partial<Product>) => void;
    resetNewProduct: () => void;
}

export const useInventoryStore = create(immer<InventoryState>((set) => ({
    // Filtering
    searchQuery: "",
    categoryFilter: undefined,
    setSearchQuery: (query) => set(state => {
        state.searchQuery = query;
        state.isFiltered = query.trim() !== "" || state.categoryFilter !== undefined;
    }),
    setCategoryFilter: (category) => set(state => {
        state.categoryFilter = category;
        state.isFiltered = state.searchQuery.trim() !== "" || category !== undefined;
    }),
    filterProducts: (products) => set(state => {
        let filtered = products;

        if (state.searchQuery.trim() !== "") {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }

        if (state.categoryFilter !== undefined) {
            filtered = filtered.filter(p => p.categoryId === state.categoryFilter);
        }

        state.filteredProducts = filtered;
        state.isFiltered = state.searchQuery.trim() !== "" || state.categoryFilter !== undefined;
    }),
    filteredProducts: [],
    isFiltered: false,

    // Modal & New Category
    isOpenModalCategory: false,
    toggleModalCategory: () => set(state => { state.isOpenModalCategory = !state.isOpenModalCategory }),
    newCategory: new Category(),
    setNewCategory: (category) => set(state => { state.newCategory = { ...state.newCategory, ...category } }),
    resetNewCategory: () => set(state => { state.newCategory = new Category() }),

    // Modal & New Product
    isOpenModalProduct: false,
    toggleModalProduct: () => set(state => { state.isOpenModalProduct = !state.isOpenModalProduct }),
    newProduct: new Product(),
    setNewProduct: (product) => set(state => { state.newProduct = { ...state.newProduct, ...product } }),
    resetNewProduct: () => set(state => { state.newProduct = new Product() }),
})));