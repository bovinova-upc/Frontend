import { useEffect } from "react";
import { AddCampaignDialog } from "../components/AddCampaignDialog";
import { CampaignList } from "../components/CampaignList";
import { SearchBar } from "../components/SearchBar";
import { useCampaignsStore } from "../stores/campaigns-store";

export function CampaignsPage() {
    const { setSearchQuery } = useCampaignsStore();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="flex flex-col mx-20 gap-15">
            <SearchBar />
            <CampaignList />
            <AddCampaignDialog />
        </div>
    )
}