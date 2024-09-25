"use client"
import { Select } from '@radix-ui/themes'
import { handleQueryChange } from '../issues/handlers';
import { useRouter, useSearchParams } from 'next/navigation';

const sizes = [ "5", "10", "15" ];

const PageSizeDropDown = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handlePageSizeChange = ( pageSize: string ) => {
        const status = searchParams.get( 'status' ) || ""
        const assignee = searchParams.get( 'assignee' ) || ''
        const query = handleQueryChange( searchParams, status, pageSize, assignee )
        router.push( query )
    }

    return (
        <Select.Root
            onValueChange={ ( value ) => handlePageSizeChange( value ) }
        >
            <Select.Trigger placeholder="Page Size" />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Page Size</Select.Label>
                    {
                        sizes.map( ( size ) => <Select.Item
                            key={ size }
                            value={ size }
                        >
                            { size }
                        </Select.Item> )
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default PageSizeDropDown
