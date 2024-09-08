import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import delay from 'delay'

const LoadingNewIssuePage = async () => {
    await delay( 5000 )
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height='20rem' />
        </Box>
    )
}

export default LoadingNewIssuePage
