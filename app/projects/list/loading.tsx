import { Skeleton } from '@/app/components'
import { Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import Link from 'next/link'


const LoadingProjectsPage = () => {
  const projects = [ 1, 2, 3, 4, 5, 6 ]

  return (
    <>
      <Flex justify='between'>
        <Heading mb='5'>Projects:</Heading>
        <Button>
          <Link href='/projects/new'>
            New Project
          </Link>
        </Button>

      </Flex >
      <Grid columns={ { initial: '1', md: '2', lg: '3' } } gapX="9" gapY='5' width="auto" >
        { projects.map( ( project ) => <Card
          style={ { padding: 0 } }
          key={ project }
        >
          <Flex direction='column' align='center'>
            <Skeleton width='100%' height={ 90 } />
          </Flex>
        </Card> ) }
      </Grid>
    </>
  )
}

export default LoadingProjectsPage