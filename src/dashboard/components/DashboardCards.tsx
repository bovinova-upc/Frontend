import CabinIcon from '@mui/icons-material/Cabin';
import CampaignIcon from '@mui/icons-material/Campaign';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PetsIcon from '@mui/icons-material/Pets';
import { DashboardCard } from "./DashboardCard";
import { useGlobalStore } from '../../shared/stores/global-store';

export function DashboardCards() {
    const { info } = useGlobalStore();

    return (
        <div className="flex w-full gap-20">
            <DashboardCard
                title="Ganado"
                content={info?.totalAnimals?.toString() || "0"}
                icon={<PetsIcon className="w-10 h-auto" />}
            />
            <DashboardCard
                title="Establos"
                content={info?.totalStables?.toString() || "0"}
                icon={<CabinIcon className="w-10 h-auto" />}
            />
            <DashboardCard
                title="Campañas"
                content={info?.totalCampaigns?.toString() || "0"}
                icon={<CampaignIcon className="w-10 h-auto" />}
            />
            <DashboardCard
                title="Personal"
                content={info?.totalStaff?.toString() || "0"}
                icon={<PeopleAltIcon className="w-10 h-auto" />}
            />
            <DashboardCard
                title="Inventario"
                content={info?.totalProducts?.toString() || "0"}
                icon={<InventoryIcon className="w-10 h-auto" />}
            />
        </div>
    )
}