import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGlobalStore } from '../../shared/stores/global-store';
import { useCampaignsStore } from '../stores/campaigns-store';

export function AddCampaignDialog() {
    const { isOpenModal, toggleModal, newCampaign, setNewCampaign, resetNewCampaign } = useCampaignsStore();
    const { addCampaign } = useGlobalStore();
    const [validationError, setValidationError] = useState<string>("");

    const handleClose = () => {
        resetNewCampaign();
        setValidationError("");
        toggleModal();
    };

    const handleSave = async () => {
        if (!newCampaign.name?.trim() || !newCampaign.description?.trim() ||
            !newCampaign.startDate || !newCampaign.endDate) {
            setValidationError("Completa todos los campos");
            return;
        }

        if (newCampaign.startDate && newCampaign.endDate &&
            newCampaign.startDate > newCampaign.endDate) {
            setValidationError("La fecha de inicio no puede ser posterior a la fecha de fin");
            return;
        }

        setValidationError("");
        await addCampaign(newCampaign);
        handleClose();
    };

    return (
        <Dialog open={isOpenModal} onClose={handleClose}  >
            <DialogTitle className='font-mulish'>Registar personal</DialogTitle>
            <DialogContent className='font-mulish flex flex-col gap-5'>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete='off'
                        placeholder="Campaña de vacunación"
                        className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                        value={newCampaign.name || ""}
                        onChange={(e) => setNewCampaign({ name: e.target.value })}
                    />

                    <label htmlFor="description">Descripcion</label>
                    <input
                        id="description"
                        type="text"
                        autoComplete='off'
                        placeholder="Vacunación contra la gripe"
                        className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                        value={newCampaign.description || ""}
                        onChange={(e) => setNewCampaign({ description: e.target.value })}
                    />
                    <div className='flex gap-5 mt-5'>
                        <DatePicker
                            label="Fecha de inicio"
                            value={newCampaign.startDate ? dayjs(newCampaign.startDate) : null}
                            onChange={(date) => {
                                if (date) {
                                    setNewCampaign({ startDate: date.toDate() });
                                }
                            }}
                        />
                        <DatePicker
                            label="Fecha de fin"
                            value={newCampaign.endDate ? dayjs(newCampaign.endDate) : null}
                            onChange={(date) => {
                                if (date) {
                                    setNewCampaign({ endDate: date.toDate() });
                                }
                            }}
                        />
                    </div>
                </div>
                {validationError && (
                    <span className="text-state-error text-sm text-center">{validationError}</span>
                )}
            </DialogContent>
            <DialogActions>
                <button
                    className="cursor-pointer rounded-sm flex items-center gap-2 px-2 py-1 bg-neutral-200 text-neutral-600"
                    onClick={handleClose}
                >
                    Cancelar
                </button>
                <button
                    className="cursor-pointer rounded-sm flex items-center gap-2 px-2 py-1 bg-brand-default text-white"
                    onClick={handleSave}
                >
                    Añadir
                </button>
            </DialogActions>
        </Dialog>
    )
}