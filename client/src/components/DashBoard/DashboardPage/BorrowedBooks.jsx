import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Table } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const BorrowedBooks = () => {
  const { loginData } = useContext(LoginContext)
	const [img, setImg] = useState();

  const dataSource = [
    {
      key: '1',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 123123134323,
      status: 'Returned',
    },
    {
      key: '2',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 203453453408,
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

  useEffect(() => {
    fetch(`/uploads/${loginData?.validUser?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setImg(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      )
  });
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
            src={img}
            width="40px"
            height="40px"
            alt=""
          />
          <div>
          <h4>{`${loginData?.validUser.firstName} ${loginData?.validUser.lastName}`}</h4>
            <small>{`${loginData?.validUser.userType}`}</small>
          </div>
        </div>
      </header>
      <main>
        <Table key="BorrowedBook" columns={columns} dataSource={dataSource}/>
      </main>
    </>
  );
};

export default BorrowedBooks;
