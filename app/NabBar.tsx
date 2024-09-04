"use client"
import classNames from "classnames";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NabBar = () => {
    const pathName = usePathname()
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ]

    return (
        <nav className="flex space-x-6 px-5 h-14 items-center border-b mb-5">
            <Link href='/'>
                <FaBug />
            </Link>
            <ul className="flex space-x-6">
                { links.map( ( link ) => <Link
                    key={ link.href }
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

                ) }
            </ul>
        </nav>
    )
}

export default NabBar