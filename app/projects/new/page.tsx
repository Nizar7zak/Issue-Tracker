import dynamic from "next/dynamic"
import ProjectFormLoading from "./loading"

const ProjectForm = dynamic(
  () => import( '@/app/issues/_components/IssueForm' ),
  {
    ssr: false,
    loading: () => <ProjectFormLoading />
  }
)
const NewIssuePage = () => {
  return (
    <ProjectForm />
  )
}

export default NewIssuePage
