import NewButton from '@/app/components/NewButton'
import IssueStatusSelector from '@/app/issues/_components/IssueStatusSelector'
import { Flex } from '@radix-ui/themes'
import FilterByAssigne from '../_components/FilterByAssigne'

const IssueActions = () => {
    return (
        <Flex justify="between">
            <Flex gap='5'>
                <IssueStatusSelector />
                <FilterByAssigne />
            </Flex>
            <NewButton title='Issue' path='issues' />
        </Flex>
    )
}

export default IssueActions
