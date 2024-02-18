import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import umbrella from "../icons/Logo.png";
import LoginBackground from "../icons/LoginBackground.jpg";
import { GBullet, LabeledTextBox, Button } from "../components/index";
import useAuth from "../hooks/useAuth";
import useCookie from "../hooks/useCookie";

import "./Ticketing.css";

const BimehStart = ({ isMobile, onSetData, globalOptions }) => {
  // const { DATAFIELDKEY, LASTPAGEKEY, BaseUrlFaraplus } = globalOptions;
  const BaseUrlFaraplus = process.env.REACT_APP_API_BASE_URL_FARAPLUSE;

  const navigate = useNavigate();
  const { setAuth, setToken, token, setIsUserLoggedIn } = useAuth();
  const { setCookie } = useCookie();

  //const [data, setData] = useState({"IsAuth":"false"});
  const [Username, setUsername] = useState("");
  const [Usernameforget, setUsernameforget] = useState("");
  const [Password, setPassword] = useState("");
  const [IsAuth, setIsAuth] = useState("");
  const [BimenameInfo, setBimenameInfo] = useState("");

  const [errorMessage, setErrorMessage] = useState();
  const [hidden, sethidden] = useState(true);
  const [hiddenChangePassWord, setHiddenChangePassWord] = useState(true);

  function Estelam() {
    sethidden(false);
    var statuss = validate();
    if (statuss) {
      //save();
      setErrorMessage("");

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        //'Authorization': `${data["token"]}`,
      };
      //var jData = JSON.stringify({ data: JSON.stringify(data).toString() });

      axios
        .post(
          BaseUrlFaraplus +
            "api/DrDamageOnline/Login?userName=" +
            Username +
            "&password=" +
            Password,
          null,
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.IsSuccess) {
            let jsonn = JSON.stringify(response.data.Data.lstBimename);
            sethidden(true);
            let userInfo = JSON.parse(
              '{"Username":"' +
                Username +
                '","Password":"' +
                Password +
                '","IsAuth":"true","Token":"' +
                response.data.Data.TokenId +
                '"}'
            );
            userInfo.lstBimename = response.data.Data.lstBimename;

            setAuth(userInfo);
            setToken(userInfo.Token);
            setIsUserLoggedIn(true);
            setCookie("token", userInfo.Token, 1);

            navigate("/");
          } else {
            var message = "";
            for (var i = 0; i < response.data.ErrorList.length; i++) {
              message += response.data.ErrorList[i].ErrorMessage + " - ";
            }
            setErrorMessage(message);
            sethidden(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setErrorMessage("خطا در برقراری ارتباط");
          sethidden(true);
        });
    } else {
      sethidden(true);
    }
  }
  function SendOtp() {
    sethidden(false);
    var statuss = validate1();
    if (statuss) {
      //save();
      setErrorMessage("");

      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        //'Authorization': `${data["token"]}`,
      };
      //var jData = JSON.stringify({ data: JSON.stringify(data).toString() });

      axios
        .post(
          BaseUrlFaraplus +
            "api/DrDamageOnline/ForgetPassword?userName=" +
            Usernameforget,
          null,
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.IsSuccess) {
            // debugger;
            setHiddenChangePassWord(true);
            sethidden(true);
            var message = "";
            for (var i = 0; i < response.data.ErrorList.length; i++) {
              message += response.data.ErrorList[i].ErrorMessage + " - ";
            }
            setErrorMessage(message);
          } else {
            var message = "";
            for (var i = 0; i < response.data.ErrorList.length; i++) {
              message += response.data.ErrorList[i].ErrorMessage + " - ";
            }
            setErrorMessage(message);
            sethidden(true);
          }
        })
        .catch((error) => {
          setErrorMessage("خطا در برقراری ارتباط");
          sethidden(true);
        });
    } else {
      sethidden(true);
    }
  }
  function save() {
    onSetData(
      JSON.parse(
        '{"Username":"' +
          Username +
          '","Password":"' +
          Password +
          '","IsAuth":"' +
          IsAuth +
          '","BimenameInfo":"' +
          BimenameInfo +
          '","Token":"' +
          token +
          '"}'
      )
    );

    return true;
  }
  function validate() {
    if (!Username || !Password) {
      setErrorMessage("وارد کردن همه فیلدها اجباری است");
      return false;
    }

    return true;
  }
  function validate1() {
    if (!Usernameforget) {
      setErrorMessage("وارد کردن همه فیلدها اجباری است");
      return false;
    }

    return true;
  }
  function ForgetPassword() {
    setHiddenChangePassWord(false);
  }
  function GotoLoginPage() {
    setHiddenChangePassWord(true);
  }

  return (
    <div id="Bimeh" className="Page">
      <div
        hidden={hidden}
        style={{
          position: "fixed",
          zIndex: "10000",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          opacity: ".9",
        }}
      >
        <img
          src={umbrella}
          style={{
            marginLeft: isMobile ? 0 : "30px",
            width: "150px",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-85px",
            marginLeft: "-80px",
            zoom: isMobile ? "0.43" : "1",
          }}
        />
      </div>

      <div className="flexDisp" style={{ justifyContent: "space-between" }}>
        <div
          className="Half HalfText"
          style={{
            display: isMobile ? "none" : "block",
            width: "50%",
            height: "100vh",
            padding: "80px",
            backgroundColor: "#f3f3f3",
          }}
        >
          <div
            id="LoginMessage"
            className="AlertText"
            style={{
              position: "absolute",
              height: "170px",
              top: "50%",
              marginTop: "-175px",
              right: "30px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}> نکات مهم </h2>
            <GBullet style={{ color: "#888", fontWeight: "600" }}>
              نام کاربری برابر با کد ملی بیمه شده اصلی است.
            </GBullet>
            <GBullet style={{ color: "#888", fontWeight: "600" }}>
              نام کاربری اتباع برابر با کد بیمه شده (از طریق پیامک دریافت شده)
              است.
            </GBullet>
            <GBullet style={{ color: "#888", fontWeight: "600" }}>
              کلمه عبور برابر با شماره موبایل بیمه شده اصلی است.
            </GBullet>
            <GBullet style={{ color: "#888", fontWeight: "600" }}>
              جهت مشاهده آموزش استفاده از سامانه و ثبت درخواست جدید روی
              <a
                style={{ textDecoration: "none", color: "#ef394e" }}
                target="_blank"
                href="https://arzyab.bimehma.com//Content/Videos/Sabt.mp4"
              >
                &nbsp;لینک 1 &nbsp;
              </a>
              و انجام استعلام های درخواست ها روی
              <a
                style={{ textDecoration: "none", color: "#ef394e" }}
                target="_blank"
                href="https://arzyab.bimehma.com//Content/Videos/Estelam.mp4"
              >
                &nbsp;لینک 2 &nbsp;
              </a>
              و جهت ایجاد دسترسی سریع روی
              <a
                style={{ textDecoration: "none", color: "#ef394e" }}
                target="_blank"
                href="https://arzyab.bimehma.com//Content/Videos/Shortcut.mp4"
              >
                &nbsp;لینک 3 &nbsp;
              </a>
              کلیک نمایید.
            </GBullet>
          </div>
        </div>
        <div
          className="Half HalfImg"
          style={{
            display: isMobile ? "none" : "block",
            width: "50%",
            height: "100vh",
            padding: "80px",
            backgroundImage: `url(${LoginBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="LoginFormContainer">
        <img
          src={umbrella}
          style={{
            opacity: 0.8,
            marginLeft: 0,
            width: "80px",
            zoom: isMobile ? "0.43" : "1",
          }}
        />

        <LabeledTextBox
          style={{ marginBottom: "30px" }}
          label="نام کاربری"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LabeledTextBox
          label="کلمه عبور"
          type="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="error ColStart1 ColEnd4"
          style={{ margin: 0, padding: "10px" }}
        >
          {errorMessage}
        </div>

        <Button
          text="ورود به سامانه"
          style={{
            alignSelf: isMobile ? "center" : "flex-end",
            width: "100%",
            left: "4%",
            bottom: "4%",
          }}
          onClick={() => {
            Estelam();
          }}
        />
        <div style={{ padding: "12px", textAlign: "right" }}>
          <a
            onClick={() => {
              ForgetPassword();
            }}
            style={{
              textDecoration: "none",
              color: "#bfa10c",
              cursor: "pointer",
            }}
          >
            &nbsp;کلمه عبور خود را فراموش کرده ام &nbsp;
          </a>
        </div>
      </div>

      <div
        hidden={hiddenChangePassWord}
        style={{
          position: "fixed",
          zIndex: "1000",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#ccc",
          opacity: ".99",
        }}
      >
        <div className="LoginFormContainer">
          <img
            src={umbrella}
            style={{
              opacity: 0.8,
              marginLeft: 0,
              width: "80px",
              zoom: isMobile ? "0.43" : "1",
            }}
          />

          <LabeledTextBox
            style={{ marginBottom: "30px" }}
            label="نام کاربری"
            value={Usernameforget}
            onChange={(e) => setUsernameforget(e.target.value)}
          />
          <div
            className="error ColStart1 ColEnd4"
            style={{ margin: 0, padding: "10px" }}
          >
            {" "}
            {errorMessage}{" "}
          </div>

          <Button
            text="درخواست تولید کلمه عبور جدید"
            style={{
              alignSelf: isMobile ? "center" : "flex-end",
              width: "100%",
              left: "4%",
              bottom: "4%",
            }}
            onClick={() => {
              SendOtp();
            }}
          />
          <Button
            secondary
            text="بازگشت به صفحه ورود"
            style={{
              alignSelf: isMobile ? "center" : "flex-end",
              width: "100%",
              left: "4%",
              bottom: "4%",
              marginTop: "10px",
              backgroundColor: "#696969",
              color: "#fff",
            }}
            onClick={() => {
              GotoLoginPage();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BimehStart;
