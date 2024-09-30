import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import authOptions from "../../auth/[...nextauth]/authOptions"
import { prisma } from "@/prisma/client"

export const DELETE = async (
    reqeust: NextRequest,
    { params: { id } }: { params: { id: string } }
) => {
    const session = await getServerSession( authOptions )
    if ( !session )
        return NextResponse.json( {}, { status: 401 } )

    const project = await prisma.project.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )

    if ( !project )
        return NextResponse.json( { error: 'Invalid Project' }, { status: 404 } )

    await prisma.project.delete( {
        where: {
            id: parseInt( id )
        }
    } )
    return NextResponse.json( {} )
}