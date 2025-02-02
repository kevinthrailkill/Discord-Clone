"use client"

import { ActionTooltip } from "@/components/action-tooltip";
import { Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface NavigationItemProps {
    server: Server;
}

export const NavigationItem = ({server}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${server.id}`);
    }

    return (
        <div>
            <ActionTooltip label={server.name} side="right" align="center">
                <button className="group relative flex items-center" onClick={onClick}>
                    <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                        params?.serverId !== server.id && "group-hover:h[20px]",
                        params?.serverId === server.id ? "h-[36px]" : "h-[8px]")} />
                    <div className={cn("relative group flex mx-3 h-[48px] w-[48px] " +
                        "rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.serverId === server.id && "bg-primary/10 text-primary rounded-[16px]")}>
                        <Image src={server.imageUrl} alt={server.name} fill />
                    </div>
                </button>
            </ActionTooltip>

        </div>
    )
}