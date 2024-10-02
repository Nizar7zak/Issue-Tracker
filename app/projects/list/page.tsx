import NewButton from "@/app/components/NewButton"
import { prisma } from "@/prisma/client"
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany( {
    where: {}
  } )
  return (
    <>
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
            <Heading as="h4" className="bg-violet-100 w-full text-center py-3" >{ project.title }</Heading>
            <Text className="my-4 ml-4">dd{ project.description }</Text>
          </Flex>
        </Card> ) }
      </Grid>
    </>
  )
}
export const dynamic = 'force-dynamic'

export default ProjectsPage