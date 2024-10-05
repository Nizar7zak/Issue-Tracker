"use client"
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const EditButton = ( { id }: { id: number } ) => {
    const pathName = usePathname()
    const path = pathName.split( '/' ).includes( 'issues' ) ? 'issues' : 'projects'

    return (
        <Button>
            <Pencil2Icon />
            <Link href={ `/${path}/edit/${id}` }>
                <Text className='text-nowrap'>
                    Edit { path === 'issues' ? "Issue" : "Project" }
                </Text>
            </Link>
        </Button>
    )
}

export default EditButton