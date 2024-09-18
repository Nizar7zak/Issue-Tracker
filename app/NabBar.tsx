"use client"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from 'next-auth/react'

const NabBar = () => {
    const pathName = usePathname()
    const { status, data: session } = useSession()
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ]

    return (
        <nav className="px-5 border-b py-3 mb-5">
            <Container>
                <Flex justify="between">
                    <Flex gap="3" align="center">
                        <Link href='/'>
                            <FaBug />
                        </Link>
                        <ul className="flex space-x-6">
                            { links.map( ( link ) => <li key={ link.href }>
                                <Link
                                    href={ link.href }
                                    className={
                                        classNames( {
                                            "text-zinc-900": link.href === pathName,
                                            "text-zinc-500": link.href !== pathName,
                                            "hover:text-zinc-800 transition-colors": true,
                                        } )
                                    }>
                                    { link.label }
                                </Link>
                            </li>
                            ) }
                        </ul></Flex>
                    <Box>
                        { status === "authenticated" &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        src={ session.user!.image! }
                                        fallback="?"
                                        size="2"
                                        radius="full"
                                        className="cursor-pointer"
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

                        { status === "unauthenticated" && <Link href='/api/auth/signin'>Login</Link> }
                    </Box>
                </Flex>
            </Container>

        </nav>
    )
}

export default NabBar