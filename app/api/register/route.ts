import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { authSchema } from "@/app/validationSchemas";


export const POST = async ( request: NextRequest ) => {
    const body = await request.json()

    const validation = authSchema.safeParse( body )
    if ( !validation.success )
        return NextResponse.json( validation.error.format(), { status: 400 } )

    const email = await prisma.user.findUnique( {
        where: {
            email: body.email
        }
    } )

    if ( email )
        return NextResponse.json( { error: "User already exist", status: 400 } )

    const hashPassword = await bcrypt.hash( body.password, 10 )

    const newUser = await prisma.user.create( {
        data: {
            email: body.email,
            hashPassword
        }
    } )

    return NextResponse.json( { email: newUser.email } )

}