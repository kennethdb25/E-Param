import React from "react";
import { Table } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const BorrowedBooks = () => {

  const dataSource = [
    {
      key: '1',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 2008,
      status: 'Returned',
    },
    {
      key: '2',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 2008,
      status: 'Returned',
    },
  ];

  const columns = [
    {
      title: 'Book Name',
      dataIndex: 'bookName',
      key: 'bookName',
      width: '30%'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: '20%'
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
      width: '20%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%'
    },
  ];
  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Borrowed Books</span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img
            src={require("../../../Assets/profile.png")}
            width="40px"
            height="40px"
            alt=""
          />
          <div>
            <h4>Russel Kenneth Pogi</h4>
            <small>Student</small>
          </div>
        </div>
      </header>
      <main>
        <Table columns={columns} dataSource={dataSource}/>
      </main>
    </>
  );
};

export default BorrowedBooks;
