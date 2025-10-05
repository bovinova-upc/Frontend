import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";

interface DashboardCardProps {
    title: string;
    icon: ReactNode;
    content: string;
}

export function DashboardCard(props: DashboardCardProps) {
    return (
        <Card className="bg-neutral-100 font-mulish flex-1 border-1 border-neutral-300 shadow-none" >
            <CardContent>
                <div className="flex items-center gap-2 text-xl text-brand-default mb-2">
                    {props.icon}
                    <h2 className="font-bold">{props.title}</h2>
                </div>
                <span className="ml-2 font-semibold text-neutral-600 text-4xl">{props.content}</span>
            </CardContent>
        </Card>
    )
}