import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import authOptions from "../../auth/[...nextauth]/authOptions"
import { prisma } from "@/prisma/client"
import { patchProjectSchema } from "@/app/validationSchemas"

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

export const PATCH = async (
    reqeust: NextRequest,
    { params: { id } }: { params: { id: string } }
) => {

    const session = await getServerSession( authOptions )
    if ( !session )
        return NextResponse.json( {}, { status: 401 } )

    const body = await reqeust.json()
    const validation = patchProjectSchema.safeParse( body )

    if ( !validation.success )
        return NextResponse.json( validation.error.format(), { status: 400 } )

    const { title, description } = body

    const project = await prisma.issue.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )
    if ( !project )
        return NextResponse.json( { error: 'Invalid Project ' }, { status: 404 } )

    const updateProject = await prisma.issue.update( {
        where: {
            id: project.id
        },
        data: {
            title,
            description,
        }
    } )
    return NextResponse.json( updateProject )
}