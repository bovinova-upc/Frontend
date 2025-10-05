import AddIcon from '@mui/icons-material/Add';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGlobalStore } from '../../shared/stores/global-store';
import { useInventoryStore } from '../stores/inventory-store';


export function SearchBar() {
    const { toggleModalCategory, toggleModalProduct, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, filterProducts } = useInventoryStore();
    const { products, categories } = useGlobalStore();

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
                            placeholder="Buscar producto por nombre"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); filterProducts(products); }}
                        />
                        <select
                            value={categoryFilter ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCategoryFilter(value === "" ? undefined : Number(value));
                                filterProducts(products);
                            }}
                            className={`bg-white px-2 py-1 rounded-md border-1 border-neutral-300 ${categoryFilter === undefined ? "text-neutral-400" : "text-neutral-800"}`}
                        >
                            <option value="">Selecciona...</option>
                            {categories
                                .map((category) => (
                                    <option key={category.id} value={category.id} className="text-neutral-800" >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button
                            className="cursor-pointer rounded-sm flex items-center gap-2 px-2 py-1 bg-brand-default text-white"
                            onClick={toggleModalCategory}
                        >
                            <AddIcon className="w-6 h-auto" />
                            Añadir categoría
                        </button>
                        <button
                            className="cursor-pointer rounded-sm flex items-center gap-2 px-2 py-1 bg-brand-default text-white"
                            onClick={toggleModalProduct}
                        >
                            <AddIcon className="w-6 h-auto" />
                            Añadir producto
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}