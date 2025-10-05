import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Stable } from "../model/stable";

interface StableState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterStables: (stables: Stable[]) => void;
    filteredStables: Stable[];
    isFiltered: boolean;
    isOpenModal: boolean;
    toggleModal: () => void;
    newStable: Stable;
    setNewStable: (stable: Partial<Stable>) => void;
    resetNewStable: () => void;
}

export const useStableStore = create(immer<StableState>((set, get) => ({
    searchQuery: "",
    setSearchQuery: (query) => {
        if (query.trim() === "") {
            set(state => {
                state.searchQuery = "";
                state.isFiltered = false;
                state.filteredStables = [];
            });
        } else {
            set(state => {
                state.searchQuery = query;
            });
        }
    },
    filterStables: (stables) => {
        const { searchQuery } = get();
        const filtered = stables.filter(s =>
            s.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        set(state => {
            state.filteredStables = filtered;
            state.isFiltered = true;
        });
    },
    isFiltered: false,
    filteredStables: [],
    isOpenModal: false,
    toggleModal: () => set(state => {
        state.isOpenModal = !state.isOpenModal;
    }),
    newStable: new Stable(),
    setNewStable: (stable) => set(state => {
        state.newStable = { ...state.newStable, ...stable };
    }),
    resetNewStable: () => set(state => {
        state.newStable = new Stable();
    }),
}))
);
