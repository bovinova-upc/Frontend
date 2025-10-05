import { useEffect } from "react";
import { AddStaffDialog } from "../components/AddStaffDialog";
import { SearchBar } from "../components/SearchBar";
import { StaffList } from "../components/StaffList";
import { useStaffStore } from "../stores/staff-store";

export function StaffPage() {
    const { setSearchQuery } = useStaffStore();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="flex flex-col mx-20 gap-15">
            <SearchBar />
            <StaffList />
            <AddStaffDialog />
        </div>
    )
}