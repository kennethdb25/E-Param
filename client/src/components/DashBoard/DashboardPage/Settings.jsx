import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../Context/Context";
import "./style.css";
import "antd/dist/antd.min.css";

const Settings = () => {
  const { loginData } = useContext(LoginContext)
	const [img, setImg] = useState();

  useEffect(() => {
    if(loginData){
      fetch(`/uploads/${loginData?.validUser.imgpath}`)
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
  }, [loginData]);
  return (
    <>
      <header>
        <h1>
          <label htmlFor="nav-toggle">
            <span className="las la-bars">Settings</span>
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
        <h1>Settings</h1>
      </main>
    </>
  )
}

export default Settings
