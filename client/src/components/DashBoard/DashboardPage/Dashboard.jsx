import React, { useContext, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { LoginContext } from "../../../Context/Context";
import { Button, Modal, Table } from "antd";
import "./style.css";
import "antd/dist/antd.min.css";

Chart.register(CategoryScale);

const Dashboard = (props) => {
  const { setCurrentActive, newBooks, bookRatingsData, borrowedRatingsData } =
    props;
  const { loginData } = useContext(LoginContext);
  const [img, setImg] = useState();
  // eslint-disable-next-line no-unused-vars
  const [imgNewBooks, setImgNewBooks] = useState();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(newBooks.body);
  const [shelfCount, setShelfCount] = useState();
  const [borrowedCount, setBorrowedCount] = useState();
  const [currBorrowedCount, setCurBorrowedCount] = useState();
  const [recentlyBorrowedCount, setRecentlyBorrowedCount] = useState();
  const [lostBookCount, setLostBookCount] = useState();
  const [isOpen, setIsOpen] = useState(false);

  borrowedRatingsData.sort((a, b) =>
    a.gradeNumber.length > b.gradeNumber.length ? -1 : b.gradeNumber.length > a.gradeNumber.length ? 1 : 0
  );
  console.log(borrowedRatingsData);
  // eslint-disable-next-line no-unused-vars
  const [chartData, setChartData] = useState({
    labels: borrowedRatingsData.map((data) => data._id),
    datasets: [
      {
        label: "Book Borrowed",
        data: borrowedRatingsData.map((data) => data.gradeNumber.length),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "pink",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "orange",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  // eslint-disable-next-line no-unused-vars
  const [ratingsData, setRatingsData] = useState({
    labels: bookRatingsData.map((data) => data._id),
    datasets: [
      {
        label: "Rating",
        data: bookRatingsData.map((data) => data.ratings[0]),
        backgroundColor: ["purple", "green", "yellow", "blue", "red"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const handleSeeAll = () => {
    setCurrentActive(3);
  };

  useEffect(() => {
    const getAddShelfPerStudent = async () => {
      if (loginData) {
        if (loginData.validUser.userType === "Student") {
          const data = await fetch(
            `/book/student-shelf?email=${loginData.validUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const res = await data.json();
          if (res.status === 200) {
            setShelfCount(res.body.length);
          }
          const currentlyBorrowedData = await fetch(
            `/book/student-currently-borrowed?email=${loginData.validUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resCurrentlyBorrowed = await currentlyBorrowedData.json();
          if (resCurrentlyBorrowed.status === 200) {
            setCurBorrowedCount(resCurrentlyBorrowed.body.length);
          }
          const borrowedData = await fetch(
            `/book/student-borrowed?email=${loginData.validUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resBorrowed = await borrowedData.json();
          if (resBorrowed.status === 200) {
            setBorrowedCount(resBorrowed.body.length);
          }

          const recentlyBorrowedData = await fetch(
            `/book/student-recently-borrowed?email=${loginData.validUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resRecentlyBorrowed = await recentlyBorrowedData.json();
          if (resRecentlyBorrowed.status === 200) {
            setRecentlyBorrowedCount(resRecentlyBorrowed.body);
          }

          const lostBooksData = await fetch(
            `/book/get-lost?email=${loginData.validUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resLostBook = await lostBooksData.json();
          if (resLostBook.status === 200) {
            setLostBookCount(resLostBook.body.length);
          }
        } else {
          const allReservedData = await fetch("/book/get-reserved", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const allReservedRes = await allReservedData.json();
          if (allReservedRes.status === 200) {
            setShelfCount(allReservedRes.body.length);
          }

          const allBorrowedData = await fetch("/book/get-borrowed", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const allBorrowedRes = await allBorrowedData.json();
          if (allBorrowedRes.status === 200) {
            setBorrowedCount(allBorrowedRes.body.length);
          }

          const currentlyBorrowedData = await fetch(
            "/book/all-currently-borrowed",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resCurrentlyBorrowed = await currentlyBorrowedData.json();
          if (resCurrentlyBorrowed.status === 200) {
            setCurBorrowedCount(resCurrentlyBorrowed.body.length);
          }

          const recentlyBorrowedData = await fetch(
            "/book/all-recently-borrowed",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const resRecentlyBorrowed = await recentlyBorrowedData.json();
          if (resRecentlyBorrowed.status === 200) {
            setRecentlyBorrowedCount(resRecentlyBorrowed.body);
          }

          const lostBooksData = await fetch("/book/get-all-lost", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const resLostBook = await lostBooksData.json();
          if (resLostBook.status === 200) {
            setLostBookCount(resLostBook.body.length);
          }
        }
      }
    };
    getAddShelfPerStudent();
  }, [loginData]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

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
    if (loginData) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);
  useEffect(() => {
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
              <h1>{borrowedCount}</h1>
              <span>Total Books Borrowed</span>
            </div>
            <div>
              <span className="las la-users"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>{shelfCount}</h1>
              <span>Number in Shelf</span>
            </div>
            <div>
              <span className="las la-clipboard-list"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>{currBorrowedCount}</h1>
              <span>Currently Borrowed</span>
            </div>
            <div>
              <span className="las la-shopping-bag"></span>
            </div>
          </div>
          <div className="card-single">
            <div>
              <h1>{lostBookCount}</h1>
              <span>Lost Books</span>
            </div>
            <div>
              <span className="lab la-google-wallet"></span>
            </div>
          </div>
        </div>
        {loginData?.validUser?.userType !== "Student" ? (
          <div className="recents-grid">
            <div className="customers">
              <div className="card-header">
                <h3>Book Ratings</h3>
              </div>
              <div className="card-body">
                <Bar
                  data={ratingsData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Pampanga High School Library Book Ratings",
                      },
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="customers">
              <div className="card-header">
                <h3>Borrowed Books per Grade</h3>
              </div>
              <div className="card-body">
                <Bar
                  data={chartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Pampanga High School Library Book Borrowed Ratings",
                      },
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
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
                      {recentlyBorrowedCount ? (
                        recentlyBorrowedCount.map((data) => {
                          return (
                            <>
                              <tr>
                                <td>{data.title}</td>
                                <td>
                                  {new Date(data.dateBorrowed).toLocaleString()}
                                </td>
                                <td>
                                  <span
                                    className={
                                      data.status === "Borrowed"
                                        ? "status blue"
                                        : data.status === "Returned"
                                        ? "status green"
                                        : "status orange"
                                    }
                                  ></span>
                                  {data.status}
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <></>
                      )}
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
                            <h4 style={{ marginBottom: 0 }}>{data.title}</h4>
                            <small>Author: {data.author}</small>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
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
              <Table key="DashboardBook" dataSource={data} columns={columns} />
            </Modal>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
