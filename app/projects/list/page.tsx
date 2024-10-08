import NewButton from "@/app/components/NewButton"
import { prisma } from "@/prisma/client"
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { Metadata } from "next"
import Link from "next/link"

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany( {
    where: {}
  } )
  return (
    <div>
      <Flex justify='between'>
        <Heading mb='5'>Projects:</Heading>
        <NewButton title='Project' path="projects" />

      </Flex >
      <Grid columns={ { initial: '1', md: '2', lg: '3' } } gapX="9" gapY='5' width="auto" >
        { projects.map( ( project ) => <Card
          style={ { padding: 0 } }
          key={ project.id }
        >
          <Flex direction='column' align='start'>
            <Link href={ `/projects/${project.id}` } className="w-full">
              <Heading as="h4" className="bg-violet-100 w-full text-center py-3" >{ project.title }</Heading>
            </Link>
            <Text className="my-4 ml-4">dd{ project.description }</Text>
          </Flex>
        </Card> ) }
      </Grid>
    </div>
  )
}
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Issue Tracker - Project List",
  description: "View all of projects",
  keywords: "issue tracker, project management, task management, bug tracking",
  openGraph: {
    title: "Issue Tracker - Projects List",
    description: "View all of projects",
    type: "website",
  }
}

export default ProjectsPage