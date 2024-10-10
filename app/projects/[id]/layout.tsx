import { IssueQuery } from '@/app/issues/list/IssueTable'
import ProjectDetailsPage from './page'

interface Props {
    params: { id: string },
    searchParams: IssueQuery,
}
const layout = ( { params }: Props ) => {
    return (
        <div>
            <ProjectDetailsPage params={ params } />
        </div>
    )
}

export default layout