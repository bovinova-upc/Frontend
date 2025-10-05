import { useEffect } from "react";
import { AddStableDialog } from "../components/AddStableDialog";
import { SearchBar } from "../components/SearchBar";
import { StableList } from "../components/StableList";
import { useStableStore } from "../stores/stable-store";


export function StablesPage() {
    const { setSearchQuery } = useStableStore();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="flex flex-col mx-20 gap-15">
            <SearchBar />
            <StableList />
            <AddStableDialog />
        </div>
    )
}