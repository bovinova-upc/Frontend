import { useEffect } from "react";
import { AnimalCard } from "./AnimalCard";
import { useGlobalStore } from "../../shared/stores/global-store";
import { useAnimalStore } from "../stores/animals-store";

export function AnimalList() {
    const { searchQuery, filteredAnimals, isFiltered, filterAnimals } = useAnimalStore();
    const { animals, fetchAnimals, fetchStables } = useGlobalStore();

    useEffect(() => {
        fetchAnimals();
        fetchStables();
    }, []);

    useEffect(() => {
        if (isFiltered) {
            filterAnimals(animals);
        }
    }, [animals, isFiltered, filterAnimals]);

    let listToShow = animals;
    let showMessage = "";

    if (animals.length === 0) {
        showMessage = "No tienes animales registrados.";
    }
    else if (isFiltered) {
        if (filteredAnimals.length == 0) {
            showMessage = `No se encontraron animales para "${searchQuery}"`;
        } else {
            listToShow = filteredAnimals;
        }
    }

    return (
        <div className="flex flex-wrap gap-15">
            {
                showMessage ? (
                    <div className="text-neutral-500 text-center w-full py-10">{showMessage}</div>
                ) : (
                    listToShow.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
                )
            }
        </div>

    );
}
