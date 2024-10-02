import { Button } from "@radix-ui/themes"
import Link from "next/link"

interface Props {
    title: string,
    path: string
}

const NewButton = ( { title, path }: Props ) => {
    return (
        <Button>
            <Link href={ `/${path}/new` }>
                New { title }
            </Link>
        </Button> )
}

export default NewButton