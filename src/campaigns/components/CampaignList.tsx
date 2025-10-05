import { useEffect } from "react";
import { useGlobalStore } from "../../shared/stores/global-store";
import { CampaignCard } from "./CampaignCard";
import { useCampaignsStore } from "../stores/campaigns-store";

export function CampaignList() {
    const { searchQuery, filteredCampaigns, isFiltered, statusFilter, filterCampaigns } = useCampaignsStore();
    const { campaigns, fetchCampaigns } = useGlobalStore();

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        if (isFiltered) {
            filterCampaigns(campaigns);
        }
    }, [campaigns, isFiltered, filterCampaigns]);

    let listToShow = campaigns;
    let showMessage = "";

    if (campaigns.length === 0) {
        showMessage = "No tienes campañas registradas.";
    }
    else if (isFiltered) {
        if (filteredCampaigns.length === 0) {
            if (searchQuery.trim() !== "") {
                showMessage = `No se encontraron campañas para “${searchQuery}”.`;
            } else {
                showMessage = `No se encontraron campañas ${statusFilter ? "activas" : "inactivas"}.`;
            }
        } else {
            listToShow = filteredCampaigns;
        }
    }


    return (
        <div className="flex flex-wrap gap-15">
            {
                showMessage ? (
                    <div className="text-neutral-500 text-center w-full py-10">{showMessage}</div>
                ) : (
                    listToShow.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)
                )
            }
        </div>

    );
}
