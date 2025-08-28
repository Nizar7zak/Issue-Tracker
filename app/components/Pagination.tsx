"use client"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}
const Pagination = ( { itemCount, pageSize, currentPage }: Props ) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const changePage = ( page: number ) => {
        const params = new URLSearchParams( searchParams )
        params.set( 'page', page.toString() )
        router.push( '?' + params.toString() )

    }

    const pageCount = Math.ceil( itemCount / pageSize );
    if ( pageCount <= 1 ) return null;
    return (
        <div className="animate-fade-in-up">
            <Flex align="center" gap='2' >
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === 1 }
                        onClick={ () => changePage( 1 ) }
                    >
                        <DoubleArrowLeftIcon />
                    </Button>
                </div>
                
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === 1 }
                        onClick={ () => changePage( currentPage - 1 ) }
                    >
                        <ChevronLeftIcon />
                    </Button>
                </div>
                
                <div className="animate-fade-in-up">
                    <Text size='2'>
                        Page { currentPage } of { pageCount }
                    </Text>
                </div>
                
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === pageCount }
                        onClick={ () => changePage( currentPage + 1 ) }
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
                
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === pageCount }
                        onClick={ () => changePage( pageCount ) }
                    >
                        <DoubleArrowRightIcon />
                    </Button>
                </div>
            </Flex>
        </div>
    )
}

export default Pagination
