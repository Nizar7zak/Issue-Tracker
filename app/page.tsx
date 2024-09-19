import Pagination from "./components/Pagination";

export default function Home( {
  searchParams = { page: '1' } }:
  { searchParams: { page: string } } ) {
  return (
    <Pagination
      itemCount={ 100 }
      pageSize={ 10 }
      currentPage={ parseInt( searchParams.page ) }
    />
  )
}
