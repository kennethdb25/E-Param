import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Button, Table, Tabs } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const AvailableBooks = () => {
  const { loginData } = useContext(LoginContext)
	const [img, setImg] = useState();

  const books = [
    "Novel",
    "Fiction",
    "Poem",
    "Short Story",
    "Narrative",
    "Science Fiction",
    "Novel",
    "Fiction",
    "Poem",
  ];
  const onChange = (key) => {
    console.log(key);
    console.log(books[key-1]);
  };

  const dataSource = [
    {
      key: '1',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 123123134323,
      status: 'Available',
    },
    {
      key: '2',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 203453453408,
      status: 'Available',
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
    {
      title: '',
      dataIndex: '',
      key: '',
      width: '20%',
      render: (record) => (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px'}}>
        <Button>Add to Shelf</Button>
        <Button>View Details</Button>
        </div>
        </>
      )
    }
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
  })

  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Available Books</span>
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
        <Tabs
          onChange={onChange}
          type="card"
          items={books.map((bookName, index) => {
            const id = String(index + 1);
            return {
              label: `${bookName}`,
              key: id,
              children: <h1>{bookName}</h1>,
            };
          })}
        />
        <Table columns={columns} dataSource={dataSource}/>
      </main>
    </>
  );
};

export default AvailableBooks;
