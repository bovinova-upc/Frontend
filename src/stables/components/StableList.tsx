import { useEffect } from "react";
import { useStableStore } from "../stores/stable-store";
import { StableCard } from "./StableCard";
import { useGlobalStore } from "../../shared/stores/global-store";

export function StableList() {
    const { searchQuery, filteredStables, isFiltered, filterStables } = useStableStore();
    const { stables, fetchStables } = useGlobalStore();

    useEffect(() => {
        fetchStables();
    }, []);

    useEffect(() => {
        if (isFiltered) {
            filterStables(stables);
        }
    }, [stables, isFiltered, filterStables]);

    let listToShow = stables;
    let showMessage = "";

    if (stables.length === 0) {
        showMessage = "No tienes establos creados.";
    }
    else if (isFiltered && filteredStables.length === 0) {
        showMessage = `No se encontraron establos para "${searchQuery}"`;
    }
    else if (isFiltered) {
        listToShow = filteredStables;
    }

    return (
        <div className="flex flex-wrap gap-15">
            {
                showMessage ? (
                    <div className="text-neutral-500 text-center w-full py-10">{showMessage}</div>
                ) : (
                    listToShow.map((stable) => <StableCard key={stable.id} stable={stable} />)
                )
            }
        </div>

    );
}
