import { Box, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
