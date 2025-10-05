import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Animal } from "../model/animal";

interface AnimalState {
    // Filtering
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterAnimals: (animals: Animal[]) => void;
    filteredAnimals: Animal[];
    isFiltered: boolean;

    // Modal & New Animal
    isOpenModal: boolean;
    toggleModal: () => void;
    newAnimal: Animal;
    setNewAnimal: (animal: Partial<Animal>) => void;
    resetNewAnimal: () => void;
}

export const useAnimalStore = create(immer<AnimalState>((set) => ({
    // Filtering
    searchQuery: "",
    setSearchQuery: (query) => set(state => {
        state.searchQuery = query;
        state.isFiltered = query.trim() != "";
    }),
    filterAnimals: (animals) => set(state => {
        if (state.isFiltered) {
            state.filteredAnimals = animals.filter(a =>
                a.name?.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }

        state.isFiltered = state.searchQuery.trim() != "";
    }),
    filteredAnimals: [],
    isFiltered: false,

    // Modal & New Animal
    isOpenModal: false,
    toggleModal: () => set(state => { state.isOpenModal = !state.isOpenModal }),
    newAnimal: new Animal(),
    setNewAnimal: (animal) => set(state => { state.newAnimal = { ...state.newAnimal, ...animal } }),
    resetNewAnimal: () => set(state => { state.newAnimal = new Animal() }),
})));