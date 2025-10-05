import AddIcon from '@mui/icons-material/Add';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGlobalStore } from '../../shared/stores/global-store';
import { StaffStatus } from '../model/staff';
import { useStaffStore } from '../stores/staff-store';

export function SearchBar() {
    const { toggleModal, searchQuery, setSearchQuery, statusFilter, setStatusFilter, filterStaff } = useStaffStore();
    const { staff } = useGlobalStore();

    return (
        <Card className="bg-neutral-100 font-mulish flex-1 border-1 border-neutral-300 shadow-none rounded-md">
            <CardContent>
                <div
                    className="flex justify-between items-center"
                >
                    <div
                        className="flex items-center w-1/2 gap-5"
                    >
                        <input
                            className="focus:outline-none bg-white px-2 py-1 rounded-md border-1 border-neutral-300 flex-1"
                            type="text"
                            placeholder="Buscar empleado por nombre"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); filterStaff(staff); }}
                        />
                        <select
                            value={statusFilter ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setStatusFilter(value === "" ? undefined : Number(value) as StaffStatus);
                                filterStaff(staff);
                            }}
                            className={`bg-white px-2 py-1 rounded-md border-1 border-neutral-300 ${statusFilter === undefined ? "text-neutral-400" : "text-neutral-800"}`}
                        >
                            <option value="">Selecciona...</option>
                            {Object.values(StaffStatus)
                                .filter((v) => typeof v === "number")
                                .map((status) => (
                                    <option key={status} value={status} className="text-neutral-800" >
                                        {StaffStatus[status as StaffStatus]}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button
                        className="cursor-pointer rounded-sm flex items-center gap-2 px-2 py-1 bg-brand-default text-white"
                        onClick={toggleModal}
                    >
                        <AddIcon className="w-6 h-auto" />
                        Añadir personal
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}