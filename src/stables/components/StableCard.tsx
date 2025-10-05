import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { useGlobalStore } from "../../shared/stores/global-store";
import { Stable } from "../model/stable";

interface StableCardProps {
    stable: Stable;
}

export function StableCard({ stable }: StableCardProps) {
    const { deleteStable, updateStable } = useGlobalStore();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(stable.name);
    const [editedLimit, setEditedLimit] = useState(stable.limit);

    const handleSave = async () => {
        await updateStable({ ...stable, name: editedName, limit: editedLimit });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(stable.name);
        setEditedLimit(stable.limit);
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
                                <input
                                    type="number"
                                    className="text-sm text-neutral-500 focus:outline-none bg-white border-1 py-1 px-2 rounded-md border-neutral-300 w-full"
                                    value={editedLimit}
                                    onChange={(e) => setEditedLimit(Number(e.target.value))}
                                />
                            </>
                        ) : (
                            <>
                                <span className="text-lg font-semibold text-neutral-800 py-1 px-2 w-full border-1 border-transparent">{stable.name}</span>
                                <span className="text-sm text-neutral-500 py-1 px-2 w-full border-1 border-transparent">Capacidad: {stable.limit}</span>
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
                                    onClick={() => deleteStable(stable)}
                                />
                            </>
                        )}
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
