import DeleteIcon from '@mui/icons-material/Delete';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGlobalStore } from "../../shared/stores/global-store";
import type { Product } from '../model/Product';
import dayjs from 'dayjs';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { deleteProduct } = useGlobalStore();

    return (
        <Card className="bg-neutral-100 font-mulish border-1 border-neutral-300 shadow-none rounded-md">
            <CardContent>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col justify-center gap-2">
                        <span className="text-lg font-semibold text-neutral-800">
                            {product.name}
                        </span>
                        <span className="text-sm text-neutral-500">
                            Cantidad: {product.quantity}
                        </span>
                        <span className="text-sm text-neutral-500">
                            Fecha de vencimiento: {product.expirationDate ? dayjs(product.expirationDate).format("DD/MM/YYYY") : "N/A"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <DeleteIcon
                            className="w-6 h-auto cursor-pointer text-neutral-500 hover:text-state-error"
                            onClick={() => deleteProduct(product)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
