"use client"
import { Flex, Select } from '@radix-ui/themes'
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

    return ( <div className='hidden md:block'>
        <span className='mr-2'>Page Size:</span>
        <Select.Root
            defaultValue={ searchParams.get( 'pageSize' ) || '10' }
            onValueChange={ ( value ) => handlePageSizeChange( value ) }
        >
            <Select.Trigger />
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
    </div>
    )
}

export default PageSizeDropDown
