import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Staff, StaffStatus } from "../model/staff";

interface StaffState {
    // Filtering
    searchQuery: string;
    statusFilter?: StaffStatus;
    setSearchQuery: (query: string) => void;
    setStatusFilter: (status?: StaffStatus) => void;
    filterStaff: (staff: Staff[]) => void;
    filteredStaff: Staff[];
    isFiltered: boolean;

    // Modal & New Staff
    isOpenModal: boolean;
    toggleModal: () => void;
    newStaff: Staff;
    setNewStaff: (staff: Partial<Staff>) => void;
    resetNewStaff: () => void;
}

export const useStaffStore = create(immer<StaffState>((set) => ({
    // Filtering
    searchQuery: "",
    statusFilter: undefined,
    setSearchQuery: (query) => set(state => {
        state.searchQuery = query;
        state.isFiltered = query.trim() !== "" || state.statusFilter !== undefined;
    }),
    setStatusFilter: (status) => set(state => {
        state.statusFilter = status;
        state.isFiltered = state.searchQuery.trim() !== "" || status !== undefined;
    }),
    filterStaff: (staff) => set(state => {
        let filtered = staff;

        if (state.searchQuery.trim() !== "") {
            filtered = filtered.filter(s =>
                s.name?.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }

        if (state.statusFilter !== undefined) {
            filtered = filtered.filter(s => s.status === state.statusFilter);
        }

        state.filteredStaff = filtered;
        state.isFiltered = state.searchQuery.trim() !== "" || state.statusFilter !== undefined;
    }),
    filteredStaff: [],
    isFiltered: false,

    // Modal & New Staff
    isOpenModal: false,
    toggleModal: () => set(state => { state.isOpenModal = !state.isOpenModal }),
    newStaff: new Staff(),
    setNewStaff: (staff) => set(state => { state.newStaff = { ...state.newStaff, ...staff } }),
    resetNewStaff: () => set(state => { state.newStaff = new Staff() }),
})));