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

const NabBar = () => {

    return (
        <nav className="px-5 border-b py-3 mb-5">
            <Container>
                <Flex justify="between">
                    <Flex gap="3" align="center">
                        <Link href='/'>
                            <FaBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
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
            links.map( ( link ) => <li key={ link.href }>
                <Link
                    href={ link.href }
                    className={
                        classNames( {
                            "nav-link": true,
                            "!text-zinc-900": link.href === pathName,
                        } )
                    }>
                    { link.label }
                </Link>
            </li>
            )
        }
    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession()
    console.log( status )
    return <Box>
        { status === "loading" && <Skeleton width='3rem' /> }
        {
            status === "authenticated" &&
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
        }

        {
            status === "unauthenticated" &&
            <Link className="nav-link" href='/api/auth/signin'>Login</Link>
        }
    </Box >
}
export default NabBar