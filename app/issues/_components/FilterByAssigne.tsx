"use client"
import { Flex, Switch } from "@radix-ui/themes";

const FilterByAssigne = () => {
    return <Flex gap='2' align='center'>
        <span>Assigned to User:</span>
        <Switch
            onCheckedChange={ ( value ) => console.log( value ) }
        />
    </Flex>
}

export default FilterByAssigne;
