import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, useLocation } from 'react-router-dom';

const Pagination1 = ({count}) => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);


  return (
    <Stack spacing={2} sx={{my: '2rem'}}>
      <Pagination
        page= {page}
        count={count}
        color='secondary' variant='outlined' shape='rounded'
        renderItem={(item) => (
          <PaginationItem component={Link}
          to={`/admin/investments/${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}/>
        )}
      />
    </Stack>
  );
}

export default Pagination1