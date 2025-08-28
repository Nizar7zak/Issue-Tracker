"use client"
import { Button, Flex, Heading, Text, Card, Avatar } from '@radix-ui/themes'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ExitIcon, PersonIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const SignOut = () => {
    const { status, data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)
        setShowConfirmation(true)
        
        setTimeout(() => {
            signOut({ callbackUrl: "/auth/signin" })
        }, 1500)
    }

    const handleCancel = () => {
        setShowConfirmation(false)
        setIsLoading(false)
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="animate-fade-in-up">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <Text className="mt-4 text-slate-600 dark:text-slate-400 animate-fade-in-up">
                        Loading...
                    </Text>
                </div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <Card className="p-8 max-w-md w-full mx-4 animate-fade-in-scale">
                    <Flex direction="column" align="center" gap="4">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-fade-in-up">
                            <ExitIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <Heading size="5" className="text-center text-slate-800 dark:text-slate-200">
                            Not Signed In
                        </Heading>
                        <Text className="text-center text-slate-600 dark:text-slate-400">
                            You need to be signed in to access this page.
                        </Text>
                        <Link href="/auth/signin">
                            <Button className="hover-scale transition-transform duration-200">
                                <ArrowLeftIcon />
                                Go to Sign In
                            </Button>
                        </Link>
                    </Flex>
                </Card>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="relative w-full max-w-xl">
                    <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl"></div>
                    <div className="relative p-8 lg:p-12">
                            <Flex direction="column" align="center" gap="6">
                                <div className="animate-fade-in-up">
                                    <Avatar 
                                        src={session?.user?.image || undefined}
                                        fallback={session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
                                        size="6"
                                        className="ring-4 ring-indigo-100 dark:ring-indigo-900/30"
                                    />
                                </div>
                                
                                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                    <Heading size="5" className="text-slate-800 dark:text-slate-200 mb-2">
                                        {session?.user?.name || session?.user?.email?.split('@')[0]}
                                    </Heading>
                                    <Text className="text-slate-600 dark:text-slate-400 text-sm">
                                        {session?.user?.email}
                                    </Text>
                                </div>

                                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                        <ExitIcon className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                {showConfirmation ? (
                                    <div className="animate-fade-in-up text-center" style={{ animationDelay: '0.3s' }}>
                                        <Heading size="4" className="text-slate-800 dark:text-slate-200 mb-2">
                                            Signing you out...
                                        </Heading>
                                        <Text className="text-slate-600 dark:text-slate-400 mb-4">
                                            Thank you for using our application!
                                        </Text>
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in-up text-center" style={{ animationDelay: '0.3s' }}>
                                        <Heading size="4" className="text-slate-800 dark:text-slate-200 mb-2">
                                            Ready to Sign Out?
                                        </Heading>
                                        <Text className="text-slate-600 dark:text-slate-400 mb-6">
                                            Are you sure you want to sign out of your account?
                                        </Text>
                                        
                                        <Flex gap="3" justify="center">
                                            <Button 
                                                onClick={handleCancel}
                                                variant="soft"
                                                className="hover-scale transition-transform duration-200"
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleLogout}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover-scale transition-all duration-200"
                                            >
                                                <ExitIcon />
                                                Sign Out
                                            </Button>
                                        </Flex>
                                    </div>
                                )}

                                {!showConfirmation && (
                                    <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                        <Link href="/">
                                            <Button variant="ghost" className="hover-scale transition-transform duration-200">
                                                <ArrowLeftIcon />
                                                Back to Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SignOut
