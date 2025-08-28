"use client"
import { Flex, Switch } from "@radix-ui/themes";
import { handleQueryChange } from "../handlers";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_PAGE_SIZE, ASSIGNED_VALUE } from "@/app/constants";

const FilterByAssignee = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleUserByFilter = ( value: boolean ) => {
        const status = searchParams.get( 'status' ) || ""
        const pageSize = searchParams.get( 'pageSize' ) || DEFAULT_PAGE_SIZE
        const assignee = value ? ASSIGNED_VALUE : ""

        const query = handleQueryChange( searchParams, status, pageSize, assignee )
        router.push( query )
        router.refresh()
    }
    return (
        <div 
            className="hidden md:block animate-fade-in-up hover-scale-sm transition-transform duration-200"
        >
            <Flex align="end" gap='2' >
                <span>Assigned Issues: </span>
                <Switch
                    defaultChecked={ !!searchParams.get( 'assignee' ) }
                    onCheckedChange={ ( value ) => handleUserByFilter( value ) }
                />
            </Flex>
        </div>
    )
}

export default FilterByAssignee;
