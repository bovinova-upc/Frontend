import { useEffect } from "react";
import { useGlobalStore } from "../../shared/stores/global-store";
import { useStaffStore } from "../stores/staff-store";
import { StaffCard } from "./StaffCard";

export function StaffList() {
    const { searchQuery, filteredStaff, isFiltered, statusFilter, filterStaff } = useStaffStore();
    const { staff, fetchStaff } = useGlobalStore();

    useEffect(() => {
        fetchStaff();
    }, []);

    useEffect(() => {
        if (isFiltered) {
            filterStaff(staff);
        }
    }, [staff, isFiltered, filterStaff]);

    let listToShow = staff;
    let showMessage = "";

    if (staff.length === 0) {
        showMessage = "No tienes personal registrado.";
    }
    else if (isFiltered) {
        if (filteredStaff.length === 0) {
            if (searchQuery.trim() !== "") {
                showMessage = `No se encontró personal para “${searchQuery}”.`;
            } else {
                showMessage = `No se encontró personal ${statusFilter === 1 ? "activo" : "inactivo"}.`;
            }
        } else {
            listToShow = filteredStaff;
        }
    }

    return (
        <div className="flex flex-wrap gap-15">
            {
                showMessage ? (
                    <div className="text-neutral-500 text-center w-full py-10">{showMessage}</div>
                ) : (
                    listToShow.map((staff) => <StaffCard key={staff.id} staff={staff} />)
                )
            }
        </div>

    );
}
