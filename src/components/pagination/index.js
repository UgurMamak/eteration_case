import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

export default function pagination({
  currentPage, //güncel sayfa
  totalCount,  // toplam data
  itemPerPage, // sayfada kaç data olucak.
  onPageChange,
}) {

  const renderList = () => {
    const list = [];
    const totalPage = Math.ceil(totalCount / itemPerPage);

    if (totalPage < 7) {
      for (let i = 1; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }
      return list;
    }

    if (currentPage > 3 && currentPage + 3 < totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));

      for (let i = currentPage - 1; i < currentPage + 2; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}aa</Pagination.Item>));
      }

      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
      list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));

      return list;
    }

    if (currentPage + 4 > totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));


      for (let i = totalPage-4; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}bb</Pagination.Item>));
      }

      return list;
    }

    for (let i = 1; i < 6; i++) {
      list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}cc</Pagination.Item>));
    }

    list.push((<Pagination.Ellipsis key = "Ellipsis" onClick={() => onPageChange(currentPage + 1)} />));
    list.push((<Pagination.Item  key={totalPage} onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));
    return list;
  }

  const renderList4 = () => {
    const list = [];
    const totalPage = Math.ceil(totalCount / itemPerPage);

    if (currentPage > 3 && currentPage + 3 < totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));

      for (let i = currentPage - 1; i < currentPage + 2; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
      list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));

      return list;
    }

    if (currentPage + 4 > totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));


      for (let i = totalPage-4; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      return list;
    }

    for (let i = 1; i < 6; i++) {
      list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
    }

    list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
    list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));
    return list;
  }

  const renderList3 = () => {
    const list = [];
    const totalPage = Math.ceil(totalCount / itemPerPage);
    console.log("TOTAL PAGE NUMBERS=", totalPage);

    if (totalPage < 7) {
      for (let i = 1; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }
      return list;
    }

    if (currentPage > 3 && currentPage + 3 < totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));

      for (let i = currentPage - 1; i < currentPage + 2; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
      list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));

      return list;
    }

    if (currentPage + 6 > totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));


      for (let i = currentPage - 3; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      return list;
    }

    for (let i = 1; i < 6; i++) {
      list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
    }

    list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
    list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));
    return list;
  }

  const renderList2 = () => {
    const list = [];
    const totalPage = Math.ceil(totalCount / itemPerPage);
    console.log("TOTAL PAGE NUMBERS=", totalPage);

    if (totalPage < 7) {
      for (let i = 1; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }
      return list;
    }

    if (currentPage > 3) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));

      for (let i = currentPage - 1; i < currentPage + 2; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
      list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));

      return list;
    }

    if (currentPage + 6 > totalPage) {
      list.push((<Pagination.Item onClick={() => onPageChange(1)} active={currentPage == 1}>{1}</Pagination.Item>));
      list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage - 1)} />));


      for (let i = currentPage - 4; i <= totalPage; i++) {
        list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
      }

      return list;
    }

    for (let i = 1; i < 6; i++) {
      list.push((<Pagination.Item key={i} onClick={() => onPageChange(i)} active={currentPage == i}>{i}</Pagination.Item>));
    }

    list.push((<Pagination.Ellipsis onClick={() => onPageChange(currentPage + 1)} />));
    list.push((<Pagination.Item onClick={() => onPageChange(totalPage)} active={currentPage == totalPage}>{totalPage}</Pagination.Item>));
    return list;
  }

  return (
    <>
      <h2>{currentPage}</h2>
      <Pagination>
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
        {renderList()}
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
      </Pagination>
    </>
  )
}
