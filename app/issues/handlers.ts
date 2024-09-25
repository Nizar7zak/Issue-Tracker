import { STATUS } from "@prisma/client"
import { ReadonlyURLSearchParams } from "next/navigation"

export const handleQueryChange = (
    searchParams: ReadonlyURLSearchParams,
    status: STATUS | string,
    pageSize: string,
    assignee: string
) => {

    if ( status === "ALL" )
        status = ""

    const params = new URLSearchParams()
    if ( status )
        params.append( 'status', status )
    if ( pageSize )
        params.append( 'pageSize', pageSize )
    if ( searchParams.get( 'orderBy' ) )
        params.append( 'orderBy', searchParams.get( 'orderBy' )! )
    if ( assignee )
        params.append( 'assignee', assignee )


    return params.size ? '?' + params.toString() : ''
}