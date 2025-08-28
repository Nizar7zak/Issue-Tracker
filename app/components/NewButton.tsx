import { Button } from "@radix-ui/themes"
import Link from "next/link"

interface Props {
    title: string,
    path: string
}

const NewButton = ( { title, path }: Props ) => {
    return (
        <div className="hover-scale transition-transform duration-200">
            <Button>
                <Link href={ `/${path}/new` }>
                    New { title }
                </Link>
            </Button>
        </div>
    )
}

export default NewButton
