import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'

interface PaginationProps {
    itemsPerPage: number,
    setRequestedPageNumber: any,
    items: []
}

const StyledPagination = styled.div`
  padding: 10px;
  // background-color: #fff;
  & ul {
    display: flex;
    list-style: none;
    justify-content: flex-end;
  }
  & ul li {
    background-color: #FFC50D;
    border-radius: 5px;
    margin: 10px;
    min-width: 40px;
    height: 40px;
    color: #d63341;
    font-weight: bold;
    text-align: center;
  }
  & ul li a{
    color: #d63341;
    font-weight: bold;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & ul li.selected {
    background-color: #d63341;
    color: #FFC50D;
  }
  & ul li.selected a{
    color: #FFC50D;
  }
`

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// let items = [];

// const Items = ({ currentItems }) => {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, setRequestedPageNumber, items = [] }) => {
  // items = [];
  // for(let i = 0; i < totalItems; i ++){
  //   items.push(i+1);
  // }
  // console.log(items);
  // We start with an empty list of items.
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemsPerPage]);
// }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setRequestedPageNumber(event.selected);
    // setItemOffset(newOffset);
  };

  return (
    <StyledPagination>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </StyledPagination>
  );
}

export default Pagination;