import type { Campaign } from "../model/campaign";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useGlobalStore } from "../../shared/stores/global-store";

export function NextCampaigns() {
    const { info } = useGlobalStore();
    const campaigns: Campaign[] = info?.nextCampaigns || [];
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(campaigns.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleCampaigns = campaigns.slice(startIndex, endIndex);

    return (
        <Card className="bg-neutral-100 font-mulish flex-1 border-1 border-neutral-300 shadow-none mb-10" >
            <CardContent className="flex flex-col justify-between mx-5 mt-5 h-155">
                <div className="flex flex-col gap-5">
                    <h2 className="font-bold text-2xl text-neutral-600">
                        Próximas campañas
                    </h2>

                    <div className="flex flex-col gap-10">
                        {campaigns.length === 0 ? (
                            <span className="text-neutral-500 text-lg italic">
                                No hay campañas próximas
                            </span>
                        ) : (
                            visibleCampaigns.map(c => (
                                <div className="flex items-center gap-2" key={c.id}>
                                    <CircleIcon className="w-3 h-auto text-neutral-400" />
                                    <div className="flex flex-col">
                                        <span className="text-neutral-600 text-xl">
                                            {c.name}
                                        </span>
                                        <span className="font-light text-neutral-600 text-lg">
                                            {dayjs(c.date).format("LL")}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {totalPages > 1 && campaigns.length > 0 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            renderItem={(item) => (
                                <PaginationItem
                                    className="font-mulish text-neutral-600"
                                    {...item}
                                />)}
                        />
                    </div>
                )}

            </CardContent>
        </Card>
    )
}
