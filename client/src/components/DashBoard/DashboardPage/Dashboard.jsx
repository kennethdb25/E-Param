import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";

const Dashboard = () => {
  const { loginData } = useContext(LoginContext)


	const [img, setImg] = useState();

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
            <img
              src={img}
              width="40px"
              height="40px"
              alt=""
            />
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
                <span>Penalty</span>
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
                  <button>
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
              <div></div>
              <div className="card">
                <div className="card-header">
                  <h3>New Books</h3>
                  <button>
                    See all<span className="las la-arrow-right"></span>
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive"></div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>{" "}
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src={require("../../../Assets/book.png")}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <div>
                        <h4>Book</h4>
                        <small>Author: Juan Dela Cruz</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="las la-user-circle"></span>
                      <span className="las la-comment"></span>
                      <span className="las la-phone"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  )
}

export default Dashboard
