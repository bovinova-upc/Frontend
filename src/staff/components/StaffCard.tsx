import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { useGlobalStore } from "../../shared/stores/global-store";
import { StaffStatus, type Staff } from '../model/staff';

interface StaffCardProps {
    staff: Staff;
}

export function StaffCard({ staff }: StaffCardProps) {
    const { deleteStaff, updateStaff } = useGlobalStore();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(staff.name);
    const [editedStatus, setEditedStatus] = useState<StaffStatus | undefined>(staff.status);

    const handleSave = async () => {
        await updateStaff({ ...staff, name: editedName, status: editedStatus });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(staff.name);
        setEditedStatus(staff.status);
        setIsEditing(false);
    };

    return (
        <Card className="bg-neutral-100 font-mulish w-50 aspect-video border-1 border-neutral-300 shadow-none rounded-md">
            <CardContent>
                <div className="flex justify-between items-center gap-2">

                    <div className="flex flex-col gap-1">
                        {isEditing ? (
                            <>
                                <input
                                    className="text-lg font-semibold text-neutral-800 focus:outline-none bg-white border-neutral-300 border-1 py-1 px-2 w-full rounded-md"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <select
                                    value={editedStatus ?? ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setEditedStatus(value === "" ? undefined : Number(value) as StaffStatus);
                                    }}
                                    className={`bg-white px-2 py-1 rounded-md border-1 border-neutral-300 ${editedStatus === undefined ? "text-neutral-400" : "text-neutral-800"}`}
                                >

                                    {Object.values(StaffStatus)
                                        .filter((v) => typeof v === "number")
                                        .map((status) => (
                                            <option key={status} value={status} className="text-neutral-800">
                                                {StaffStatus[status as StaffStatus]}
                                            </option>
                                        ))}
                                </select>
                            </>
                        ) : (
                            <>
                                <span className="text-lg font-semibold text-neutral-800 py-1 px-2 w-full border-1 border-transparent">{staff.name}</span>
                                <span className="text-sm text-neutral-500 py-1 px-2 w-full border-1 border-transparent">
                                    Estado: {staff.status !== undefined ? StaffStatus[staff.status] : "Desconocido"}
                                </span>
                            </>
                        )}

                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        {isEditing ? (
                            <>
                                <CheckIcon
                                    className="w-6 h-auto cursor-pointer text-neutral-500 hover:text-state-success"
                                    onClick={handleSave}
                                />
                                <CloseIcon
                                    className="w-6 h-auto cursor-pointer text-neutral-500 hover:text-state-error"
                                    onClick={handleCancel}
                                />
                            </>
                        ) : (
                            <>
                                <EditIcon
                                    className="w-6 h-auto cursor-pointer text-neutral-500 hover:text-neutral-900"
                                    onClick={() => setIsEditing(true)}
                                />
                                <DeleteIcon
                                    className="w-6 h-auto cursor-pointer text-neutral-500 hover:text-state-error"
                                    onClick={() => deleteStaff(staff)}
                                />
                            </>
                        )}
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
