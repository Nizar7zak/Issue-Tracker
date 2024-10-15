import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt'
const authOptions: NextAuthOptions = {

    adapter: PrismaAdapter( prisma ),
    providers: [
        CredentialsProvider( {
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize( credentials, req ) {
                if ( !credentials?.email || !credentials.password )
                    return null
                const user = await prisma.user.findUnique( {
                    where: {
                        email: credentials.email
                    }
                } )

                if ( !user ) return null
                const passwordMatch = await bcrypt.compare( credentials.password, user.hashPassword! )
                return passwordMatch ? user : null

            },
        } ),
        GoogleProvider( {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        } )
    ],
    pages: {
        signIn: '/auth/signin', 
    },
    session: {
        strategy: 'jwt'
    }

}
export default authOptions