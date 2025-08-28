"use client"
import { Skeleton } from '@/app/components';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from 'next-auth/react';
import { StaticImageData } from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserImage from '../public/userPlaceholder.png';
import { ThemeToggle } from './components/ThemeToggle';

const NabBar = () => {
    const pathName = usePathname()
    const status = pathName.includes("auth") ? "hidden" : "block"
    return (
        <nav className={`px-5 border-b border-slate-200/60 dark:border-slate-700/60 py-4 mb-5 animate-fade-in-up bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm ${status}`}>
            <Container>
                <Flex justify="between">
                    <Flex gap="3" align="center">
                        <div className="hover-scale transition-transform duration-200">
                            <Link href='/'>
                                <div className="flex items-center gap-2">
                                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 dark:text-purple-400">
                                        <defs>
                                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                                                <stop offset="100%" style={{stopColor: '#A855F7', stopOpacity: 1}} />
                                            </linearGradient>
                                        </defs>
                                        
                                        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" stroke="#7C3AED" strokeWidth="2"/>
                                        
                                        <ellipse cx="24" cy="20" rx="8" ry="6" fill="white" opacity="0.9"/>
                                        
                                        <circle cx="24" cy="14" r="4" fill="white" opacity="0.9"/>
                                        
                                        <path d="M20 12L18 8M28 12L30 8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                                        
                                        <circle cx="22" cy="13" r="1" fill="#8B5CF6"/>
                                        <circle cx="26" cy="13" r="1" fill="#8B5CF6"/>
                                        
                                        <path d="M16 18L12 16M32 18L36 16" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                                        <path d="M16 22L12 24M32 22L36 24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                                        
                                        <ellipse cx="18" cy="18" rx="3" ry="2" fill="white" opacity="0.6"/>
                                        <ellipse cx="30" cy="18" rx="3" ry="2" fill="white" opacity="0.6"/>
                                    </svg>
                                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">
                                        Issue Tracker
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <NavLinks />
                    </Flex>
                    <Flex gap="3" align="center">
                        <ThemeToggle />
                        <AuthStatus />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const pathName = usePathname()
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ]

    return <ul className="flex space-x-6" >
        {
            links.map( ( link, index ) => (
                <li 
                    key={ link.href }
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <Link
                        href={ link.href }
                        className={
                            classNames( {
                                "nav-link font-medium": true,
                                "!text-purple-600 dark:!text-purple-400": link.href === pathName,
                                "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100": link.href !== pathName,
                            } )
                        }>
                        { link.label }
                    </Link>
                </li>
            ))
        }
    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession()
    return <Box>
        { status === "loading" && <Skeleton width='3rem' /> }
        {
            status === "authenticated" &&
            <div className="animate-fade-in-scale">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={
                                typeof session?.user?.image === 'string' ?
                                    session.user.image :
                                    ( UserImage as StaticImageData ).src
                            }
                            fallback={session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
                            size="2"
                            radius="full"
                            className="cursor-pointer block ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-purple-300 dark:hover:ring-purple-600 transition-all duration-200"
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-2xl dark:shadow-slate-900/50">

                        <DropdownMenu.Label>
                            <Text size='2' className="text-slate-700 dark:text-slate-300">
                                { session.user!.email }
                            </Text>
                        </DropdownMenu.Label>

                        <DropdownMenu.Item className="hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Link href='/api/auth/signout' className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400">Logout</Link>
                        </DropdownMenu.Item>

                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        }

        {
            status === "unauthenticated" &&
            <div className="animate-fade-in-right">
                <Link className="nav-link" href='/auth/signin'>Login</Link>
            </div>
        }
    </Box >
}
export default NabBar
