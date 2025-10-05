import { useEffect } from "react";
import { AddAnimalDialog } from "../components/AddAnimalDialog";
import { AnimalList } from "../components/AnimalList";
import { SearchBar } from "../components/SearchBar";
import { useAnimalStore } from "../stores/animals-store";


export function AnimalsPage() {
    const { setSearchQuery } = useAnimalStore();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="flex flex-col mx-20 gap-15">
            <SearchBar />
            <AnimalList />
            <AddAnimalDialog />
        </div>
    )
}