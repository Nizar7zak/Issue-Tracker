import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'
const LoadingIssueDetailsPage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap='4' my='3'>
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />
            </Flex>
            <Card className="prose">
                <Skeleton count={ 3 } />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailsPage
