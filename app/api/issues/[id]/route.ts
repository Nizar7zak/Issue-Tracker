import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (
    reqeust: NextRequest,
    { params: { id } }: { params: { id: string } }
) => {
    const body = await reqeust.json()
    const validation = issueSchema.safeParse( body )

    if ( !validation.success )
        return NextResponse.json( validation.error.format(), { status: 400 } )

    const issue = await prisma.issue.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )
    console.log(issue)

    if ( !issue )
        return NextResponse.json( { error: 'Invalid Issue ' }, { status: 400 } )

    const updatedIssue = await prisma.issue.update( {
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description,
            status: body.status

        }
    } )
    return NextResponse.json( updatedIssue )
}