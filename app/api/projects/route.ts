import { projectSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

export const POST = async ( request: NextRequest ) => {
    // const session = await getServerSession( authOptions )
    // if ( !session )
    //     return NextResponse.json( {}, { status: 401 } )

    const body = await request.json()
    const validation = projectSchema.safeParse( body )

    if ( !validation.success )
        return NextResponse.json( validation.error.format(), { status: 400 } )

    const newProject = await prisma.project.create( {
        data: {
            title: body.title,
            description: body.description
        }
    } )
    return NextResponse.json( newProject, { status: 201 } )

}