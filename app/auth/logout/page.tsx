"use client"
import { Button, Flex, Heading } from '@radix-ui/themes'
import { signOut, useSession } from 'next-auth/react'

const SignOut = () => {
    const { status, data: session } = useSession()

    return (
        <Flex
            className="mt-20"
            justify="center"
        >
            <Flex className="w-2/5 rounded-2xl bg-indigo-100 p-12" direction='column' gap='5'>
                <Heading className="self-center text-indigo-800">
                    Logging you out { session?.user?.email?.split( '@' )[ 0 ] }!
                </Heading>
                <Button onClick={ () => signOut( { callbackUrl: "/auth/signin" } ) }>
                    Logout
                </Button>
            </Flex>
        </Flex>
    )
}

export default SignOut