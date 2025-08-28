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
            <Flex align="center" gap='2' className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-lg p-3 shadow-lg dark:shadow-slate-900/20">
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === 1 }
                        onClick={ () => changePage( 1 ) }
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
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
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                    >
                        <ChevronLeftIcon />
                    </Button>
                </div>
                
                <div className="animate-fade-in-up px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Text size='2' className="text-slate-700 dark:text-slate-300 font-medium">
                        Page { currentPage } of { pageCount }
                    </Text>
                </div>
                
                <div className="hover-scale transition-transform duration-200">
                    <Button
                        color="gray"
                        variant="soft"
                        disabled={ currentPage === pageCount }
                        onClick={ () => changePage( currentPage + 1 ) }
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
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
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                    >
                        <DoubleArrowRightIcon />
                    </Button>
                </div>
            </Flex>
        </div>
    )
}

export default Pagination
