import React from "react";
import { Button, Table, Tabs } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const AvailableBooks = () => {
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
      isbn: 2008,
      status: 'Available',
    },
    {
      key: '2',
      bookName: 'Mike',
      author: 'John Doe',
      isbn: 2008,
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
