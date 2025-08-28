"use client"
import { Skeleton } from '@/app/components';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from 'next-auth/react';
import { StaticImageData } from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import UserImage from '../public/userPlaceholder.png';
import { ThemeToggle } from './components/ThemeToggle';

const NabBar = () => {
    const pathName = usePathname()
    const status = pathName.includes("auth") ? "hidden" : "block"
    return (
        <nav className={`px-5 border-b py-3 mb-5 animate-fade-in-up ${status}`}>
            <Container>
                <Flex justify="between">
                    <Flex gap="3" align="center">
                        <div className="hover-scale transition-transform duration-200">
                            <Link href='/'>
                                <FaBug className="text-2xl" />
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
                                "nav-link": true,
                                "!text-zinc-900 dark:!text-zinc-100": link.href === pathName,
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
                            fallback='?'
                            size="2"
                            radius="full"
                            className="cursor-pointer block"
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>

                        <DropdownMenu.Label>
                            <Text size='2'>
                                { session.user!.email }
                            </Text>
                        </DropdownMenu.Label>

                        <DropdownMenu.Item>
                            <Link href='/api/auth/signout'>Logout</Link>
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
