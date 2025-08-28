import NewButton from '@/app/components/NewButton'
import IssueStatusSelector from '@/app/issues/_components/IssueStatusSelector'
import { Flex } from '@radix-ui/themes'
import FilterByAssignee from '../_components/FilterByAssignee'

const IssueActions = () => {
    return (
        <Flex justify="between">
            <Flex gap='5'>
                <div className="animate-fade-in-left">
                    <IssueStatusSelector />
                </div>
                <div className="animate-fade-in-left">
                    <FilterByAssignee />
                </div>
            </Flex>
            <div className="animate-fade-in-right hover-scale transition-transform duration-200">
                <NewButton title='Issue' path='issues' />
            </div>
        </Flex>
    )
}

export default IssueActions
