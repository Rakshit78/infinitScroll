import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { post } from './types';
const List: React.FC = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [listdata, setListdata] = useState<post[]>([]);
  const getdata = async () => {
    try {
      setLoad(true);
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}  `
      );
      const data = await res.json();
      setListdata((prev: any) => [...prev, ...data.hits]);
      setLoad(false);
      //console.log(data.hits);
    } catch (e) {
      console.log(e);
    }
  };
  const handlepage = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    !load && getdata();
  }, [page]);

  useEffect(() => {
    const id = setInterval(() => {
      handlepage();
    }, 10000);
    return () => clearInterval(id);
  }, []);
  const getjson = (res: any) => {
    navigate('/json', { state: res });
  };
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <InfiniteScroll
          dataLength={listdata.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <TableBody>
            {listdata?.map((res: any, index: number) => {
              return (
                <TableRow
                  data-testid={`row-${index}`}
                  onClick={getjson.bind(this, res)}
                >
                  <TableCell>
                    {res.story_title ? res.story_title : 'data not found'}
                  </TableCell>
                  <TableCell>
                    {res.story_url ? res.story_url : 'data not found'}
                  </TableCell>
                  <TableCell>
                    {res.created_at ? res.created_at : 'data not found'}
                  </TableCell>
                  <TableCell>
                    {res.author ? res.author : 'data.not found'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </InfiniteScroll>
      </Table>
      {load && <CircularProgress />}
    </>
  );
};

export default List;

/*
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        !load && handlepage();
      }
    });
  }, []);


   useEffect(() => {
    const id = setInterval(() => {
      handlepage();
    }, 10000);
    return () => clearInterval(id);
  }, []);
*/
