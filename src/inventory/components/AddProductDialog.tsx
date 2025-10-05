import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGlobalStore } from '../../shared/stores/global-store';
import { useInventoryStore } from '../stores/inventory-store';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export function AddProductDialog() {
    const { isOpenModalProduct, toggleModalProduct, newProduct, setNewProduct, resetNewProduct } = useInventoryStore();
    const { addProduct, categories } = useGlobalStore();
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
    const [validationError, setValidationError] = useState<string>("");

    const handleClose = () => {
        resetNewProduct();
        setSelectedCategoryName("");
        setValidationError("");
        toggleModalProduct();
    };

    const handleSave = async () => {
        if (!newProduct.name?.trim() || !newProduct.quantity || newProduct.quantity <= 0 ||
            !newProduct.categoryId || !newProduct.expirationDate) {
            setValidationError("Completa todos los campos");
            return;
        }

        setValidationError("");
        await addProduct(newProduct);
        handleClose();
    };

    return (
        <Dialog open={isOpenModalProduct} onClose={handleClose}  >
            <DialogTitle className='font-mulish'>Registrar producto</DialogTitle>
            <DialogContent className='font-mulish flex flex-col gap-5'>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete='off'
                        placeholder="Javier Lopez"
                        className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                        value={newProduct.name || ""}
                        onChange={(e) => setNewProduct({ name: e.target.value })}
                    />
                    <label htmlFor="limit">Cantidad</label>
                    <input
                        id="limit"
                        type="text"
                        autoComplete='off'
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="10"
                        className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                        value={newProduct.quantity === 0 ? "" : newProduct.quantity}
                        onChange={(e) => {
                            let val = e.target.value;

                            // Eliminar todo lo que no sea dígito
                            val = val.replace(/\D/g, "");

                            // Evitar ceros iniciales
                            if (val.startsWith("0") && val.length > 1) {
                                val = val.replace(/^0+/, "");
                            }

                            setNewProduct({ quantity: val === "" ? 0 : Number(val) });
                        }}
                    />
                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        value={selectedCategoryName}
                        onChange={(e) => {
                            const name = e.target.value;
                            setSelectedCategoryName(name);

                            const category = categories.find(c => c.name === name);
                            setNewProduct({ categoryId: category ? category.id : undefined });
                        }}
                        className={`bg-white px-2 py-1 rounded-md border-1 border-neutral-300 ${selectedCategoryName === "" ? "text-neutral-400" : "text-neutral-800"}`}
                    >
                        <option value="" className="text-neutral-400">Selecciona...</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.name} className="text-neutral-800">
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <DatePicker
                        className='mt-5'
                        label="Fecha de inicio"
                        value={newProduct.expirationDate ? dayjs(newProduct.expirationDate) : null}
                        onChange={(date) => {
                            if (date) {
                                setNewProduct({ expirationDate: date.format("YYYY-MM-DD") });
                            }
                        }}
                    />
                </div>
                {validationError && (
                    <span className="text-state-error text-sm text-center">{validationError}</span>
                )}
            </DialogContent>
            <DialogActions className='font-mulish'>
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