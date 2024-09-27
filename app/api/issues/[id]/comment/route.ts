import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { commentSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    reqeust: NextRequest,
    { params: { id: issueId } }: { params: { id: string } } ) => {
    const session = await getServerSession( authOptions )
    if ( !session )
        return NextResponse.json( {}, { status: 401 } )

    const user = await prisma.user.findUnique( {
        where: {
            email: session.user?.email!
        }
    } )

    const body = await reqeust.json()
    const validation = commentSchema.safeParse( body )

    if ( !validation.success )
        return NextResponse.json( validation.error.format(), { status: 400 } )

    const issue = await prisma.issue.findUnique( {
        where: { id: parseInt( issueId ) }
    } )

    if ( !issue )
        return NextResponse.json( { error: 'Invalid Issue ' }, { status: 404 } )

    const newComment = await prisma.comment.create( {
        data: {
            content: body.content,
            issueId: parseInt( issueId ),
            userId: user?.id!,
        }
    } )

    return NextResponse.json( { newComment }, { status: 201 } )
}

export const GET = async (
    request: NextRequest,
    { params: { id: issueId } }: { params: { id: string } }
) => {

    const issues = await prisma.issue.findMany( {
        where: { id: parseInt( issueId ) }
    } )

    if ( !issues )
        return NextResponse.json( { error: 'Invalid Issues ' }, { status: 404 } )

    const comments = await prisma.comment.findMany( {
        where: {
            issueId: parseInt( issueId )
        },
        include: {
            user: true
        }
    } )

    return NextResponse.json( comments, { status: 200 } )

}

export const DELETE = async (
    reqeust: NextRequest,
    { params: { id: issueId } }:
        { params: { id: string } }
) => {

    const session = await getServerSession( authOptions )
    if ( !session )
        return NextResponse.json( {}, { status: 401 } )

    const issue = await prisma.issue.findUnique( {
        where: { id: parseInt( issueId ) }
    } )
    const body = await reqeust.json()

    if ( !issue )
        return NextResponse.json( { error: 'Invalid Issue ' }, { status: 404 } )


    const comment = await prisma.comment.findUnique( {
        where: { id: body.id }
    } )

    if ( !comment )
        return NextResponse.json( { error: 'Invalid comment ' }, { status: 404 } )


    const user = await prisma.user.findUnique( {
        where: { email: session.user!.email! }
    } )
    console.log( user )
    if ( !( comment.userId === user?.id ) )
        return NextResponse.json( { error: 'You are not the owner for this comment!' }, { status: 401 } )

    await prisma.comment.delete( {
        where: { id: body.id }
    } )

    return NextResponse.json( { message: 'your comment deleted!' } )
}