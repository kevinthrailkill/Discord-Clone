import {currentProfile} from "@/lib/current-profile";
import {v4 as uuidv4} from "uuid";
import {db} from "@/db/db";
import {NextResponse} from "next/server";
import {MemberRole} from "@prisma/client";


export async function POST(req: Request) {
    try {
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {name: "general", profileId: profile.id}
                    ]
                },
                members: {
                    create: [
                        {profileId: profile.id, role: MemberRole.ADMIN},
                    ]
                },
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }

}

export async function PATCH(req: Request,
                            {params}: { params: { serverId: string } }) {
    try {
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!params.serverId) {
            return new NextResponse("Server Id Missing", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl,
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[SERVER_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500});
    }

}