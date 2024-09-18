"use client"
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    const [ users, setUsers ] = useState<User[]>( [] )

    const fetchUsers = async () => {
        const { data: users } = await axios.get( '/api/users' )
        setUsers( users )
    }

    useEffect( () => {
        fetchUsers()

    }, [] )
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>
                        Suggestions
                    </Select.Label>
                    { users.map( ( user ) => <Select.Item
                        key={ user.id }
                        value={ user.id }
                    >
                        { user.name }
                    </Select.Item> ) }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
