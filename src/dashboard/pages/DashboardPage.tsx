import { useEffect } from "react";
import { useGlobalStore } from "../../shared/stores/global-store";
import { DashboardCards } from "../components/DashboardCards";
import { NextCampaigns } from "../components/NextCampaigns";

export function DashboardPage() {
    const {
        info,
        fetchInfo,
        //fetchAnimal, 
        fetchStables,
        fetchCampaigns,
        fetchStaff,
        fetchCategories,
        fetchProducts
    } = useGlobalStore();

    useEffect(() => {
        fetchInfo();
        //fetchAnimal();
        fetchStables();
        fetchCampaigns();
        fetchStaff();
        fetchCategories();
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col w-full gap-20 mx-auto px-20 font-mulish">
            <h2 className="text-4xl text-neutral-600 font-semibold">Bienvenido {info?.name || ""}</h2>
            <DashboardCards />
            <NextCampaigns />
        </div>
    )
}