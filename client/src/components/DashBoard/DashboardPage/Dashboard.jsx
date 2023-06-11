import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import { Button, Modal, Table } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

const Dashboard = (props) => {
  const { setCurrentActive, newBooks } = props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  const [imgNewBooks, setImgNewBooks] = useState();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(newBooks.body);
  const [isOpen, setIsOpen] = useState(false);

  const handleSeeAll = () => {
    setCurrentActive(3);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const dataSource = [
    {
      key: "1",
      bookName: "Mike",
      author: "John Doe",
      isbn: 123123134323,
      status: "Returned",
    },
    {
      key: "2",
      bookName: "Mike",
      author: "John Doe",
      isbn: 203453453408,
      status: "Returned",
    },
  ];

  const columns = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
      );
      fetch(`/uploads/${data?.imgpath}`)
      .then((res) => res.blob())
      .then(
        (result) => {
          setImgNewBooks(URL.createObjectURL(result));
        },
        (error) => {
          console.log(error);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Dashboard</span>
          </label>
        </h1>
        <div className="user-wrapper">
          <img src={img} width="40px" height="40px" alt="" />
          <div>
            <h4>{`${loginData?.validUser?.firstName} ${loginData?.validUser?.lastName}`}</h4>
            <small>{`${loginData?.validUser?.userType}`}</small>
          </div>
        </div>
      </header>
      <main>
        <div className="cards">
          <div className="card-single">
            <div>
              <h1>54</h1>
              <span>Total Books Borrowed</span>
            </div>
            <div>
              <span className="las la-users"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>9</h1>
              <span>Number in Shelf</span>
            </div>
            <div>
              <span className="las la-clipboard-list"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>2</h1>
              <span>Currently Borrowed</span>
            </div>
            <div>
              <span className="las la-shopping-bag"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>0</h1>
              <span>Lost Books</span>
            </div>
            <div>
              <span className="lab la-google-wallet"></span>
            </div>
          </div>
        </div>
        <div className="recent-grid">
          <div className="projects">
            <div className="card">
              <div className="card-header">
                <h3>Recently Borrowed</h3>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSeeAll()}
                >
                  See all<span className="las la-arrow-right"></span>
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Book Name</td>
                        <td>Date Borrowed</td>
                        <td>Status</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>BOOK1</td>
                        <td>May 20, 2023</td>
                        <td>
                          <span className="status purple"></span>
                          Returned
                        </td>
                      </tr>
                      <tr>
                        <td>BOOK3</td>
                        <td>May 25, 2023</td>
                        <td>
                          <span className="status purple"></span>
                          Returned
                        </td>
                      </tr>
                      <tr>
                        <td>BOOK3</td>
                        <td>May 26, 2023</td>
                        <td>
                          <span className="status purple"></span>
                          Returned
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="customers">
            <div className="card">
              <div className="card-header">
                <h3>New Books</h3>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenModal()}
                >
                  See all<span className="las la-arrow-right"></span>
                </button>
              </div>
              <div className="card-body">
                {/* <div className="table-responsive"></div> */}
                {data.map((data) => {
                  return (
                    <>
                      <div className="customer">
                        <div className="info">
                          <img
                            src={require("../../../Assets/images.jpeg")}
                            width="40px"
                            height="40px"
                            alt=""
                          />
                          <div>
                            <h4>{data.title}</h4>
                            <small>Author: {data.author}</small>
                          </div>
                        </div>
                        <div className="contact">
                          <span className="las la-user-circle"></span>
                          <span className="las la-comment"></span>
                          <span className="las la-phone"></span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="modals">
        <Modal
          title="New Books"
          width={1000}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <Table dataSource={data} columns={columns} />
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
