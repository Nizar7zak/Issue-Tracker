"use client"
import { Flex, Switch } from "@radix-ui/themes";
import { handleQueryChange } from "../handlers";
import { useRouter, useSearchParams } from "next/navigation";

const FilterByAssigne = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleUserByFilter = ( value: boolean ) => {
        const status = searchParams.get( 'status' ) || ""
        const pageSize = searchParams.get( 'pageSize' ) || "10"
        const assignee = value ? "true" : "false"
        const query = handleQueryChange( searchParams, status, pageSize, assignee )
        router.push( query )
        router.refresh()
    }
    return <div className="hidden md:block">
        <Flex align="end" gap='2' >
            <span>Assigned Issues: </span>
            <Switch
                onCheckedChange={ ( value ) => handleUserByFilter( value ) }
            />
        </Flex>
    </div>
}

export default FilterByAssigne;
