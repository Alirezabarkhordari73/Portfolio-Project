import React, { useEffect, useRef, useState, useContext } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import "../Pages/Ticketing.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faUser } from "@fortawesome/free-solid-svg-icons";

import {
  Header,
  LabeledSelect,
  Button,
  LabeledTextBox,
  LabeledTextArea,
  QuestionsForm,
  ErrorMessageShowBox,
  ReCapcha,
  Loading,
} from "../components/index";
import AuthContext from "../context/AuthProvider";
import useValidation from "../hooks/useValidation";

const Page1 = ({ data, isMobile, pageNum = 1, globalOptions }) => {
  const { DATAFIELDKEY, LASTPAGEKEY, BaseUrlFaraplus } = globalOptions;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { validationFunc, error, isPhoneNumber, checkCodeMeli } =
    useValidation();
  const [validationError, setValidationError] = useState();

  const DATAFIELD = "ًTicketing";

  const questionsList = [
    {
      title: "تست",
      value: 1,
      fieldName: "تست",
      noHeader: true,
      questions: [
        {
          title: "Test1",
          template: "",
          fieldName: "Test1",
          errorMessage: "فیلد تست 1 اجباری میباشد",
        },
        {
          title: "تاریخ",
          template: "",
          type: "Date",
          fieldName: "تاریخ",
          errorMessage: "مقدار تاریخ را درست وارد نمایید",
        },
        {
          title: "Test3",
          template: "",
          fieldName: "Test3",
          errorMessage: "",
          validator: (w) =>
            validationFunc(
              [
                { method: "isNumeric", errorMsg: "مقدار عددی را وارد کنید" },
                { method: "isRequired", errorMsg: "مقدار را وارد کنید" },
              ],
              w
            ),
        },
      ],
    },
  ];

  const [questionInfo, setQuestionInfo] = useState([...questionsList]);

  const initialstate = {
    systemType: [],
    questionType: [],
    fullName: "",
    phoneNumber: "",
    nationalCode: "",
    messageText: "",
    // reCapcha: "",
  };

  useEffect(() => {
    var x = Object.values(error);
    setValidationError(x.join(" "));
    setQuestionInfo([...questionsList]);
  }, [error, validationError]);

  const [formStates, setFormStates] = useState(initialstate);

  const {
    systemType,
    questionType,
    fullName,
    phoneNumber,
    nationalCode,
    messageText,
    // reCapcha,
  } = formStates;

  const [errorMessage, setErrorMessage] = useState({
    systemType: "",
    questionType: "",
    fullName: "",
    phoneNumber: "",
    nationalCode: "",
    messageText: "",
    reCaptchaCode: "",
  });
  const [errorMessageDynamicForm, setErrorMessageDynamicform] = useState([]);
  const [IsAuth, setIsAuth] = useState(data["IsAuth"] ? data["IsAuth"] : "");
  const [selected, setSelected] = useState(initialSelected());
  const [reCaptchaCode, setReCaptchaCode] = useState("");

  function initialSelected() {
    if (data && data[DATAFIELD])
      return questionType.map((d) =>
        data[DATAFIELD].reduce(
          (p, it) => p || it[d.fieldName] == d.value,
          false
        )
      );
    else return [];
  }
  const [answers, setAnswers] = useState(
    Array.isArray(data[DATAFIELD]) ? data[DATAFIELD] : []
  );

  const [isAnswersOk, setIsAnswersOk] = useState(false);

  const [isBtnClicked, SetIsBtnClicked] = useState(false);
  const [activeInput, setActiveInput] = useState(false);

  const [hiddenPass, setHiddenPass] = useState(true);

  useEffect(() => {
    validateFormOnChange();
  }, [formStates]);

  // Validate For Submit Form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "نام و نام خانوادگی الزامی میباشد";
      isValid = false;
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "شماره همراه الزامی میباشد";
      isValid = false;
    }

    if (!nationalCode) {
      newErrors.nationalCode = "کدملی الزامی میباشد";
      isValid = false;
    }

    if (!messageText) {
      newErrors.messageText = "پیام الزامی میباشد";
      isValid = false;
    }

    if (systemType.length === 0) {
      newErrors.systemType = "نوع سیستم الزامی میباشد";
      isValid = false;
    }

    // if (questionType.length === 0) {
    //   newErrors.questionType = "نوع سوال الزامی میباشد";
    //   isValid = false;
    // }

    // if (!reCaptchaCode) {
    //   newErrors.reCaptchaCode = "کد امنیتی الزامی میباشد";
    //   isValid = false;
    // }

    // if (!reCapcha) {
    //   newErrors.reCapcha = "کد امنیتی الزامی میباشد";
    //   isValid = false;
    // }

    setErrorMessage(newErrors);
    return isValid;
  };

  // // Validate For onChange Mode

  // const validateFormOnChange = (inputName, value) => {
  //   const newErrors = {};
  //   let isValid = true;

  //   switch (inputName) {
  //     case "systemType":
  //       if (value === "") {
  //         newErrors.systemType = "";
  //       } else newErrors.systemType = "نوع سیستم الزامی میباشد";
  //       isValid = false;

  //       break;
  //     case "questionType":
  //       if (value === "") {
  //         newErrors.questionType = "";
  //       } else newErrors.questionType = "نوع سیستم الزامی میباشد";
  //       isValid = false;
  //       break;
  //     case "fullName":
  //       if (value === "") {
  //         newErrors.fullName = "نام و نام خانوادگی الزامی میباشد";
  //         isValid = false;
  //       } else if (value.length <= 5) {
  //         newErrors.fullName = "مقدار وارد شده کمتر از حد مجاز میباشد";
  //         isValid = false;
  //       } else newErrors.fullName = "";

  //       break;
  //     case "phoneNumber":
  //       if (value === "") {
  //         newErrors.phoneNumber = "شماره همراه الزامی میباشد";
  //         isValid = false;
  //       } else if (!isPhoneNumber(value)) {
  //         newErrors.phoneNumber = "فرمت شماره همراه صحیح نمیباشد";
  //         isValid = false;
  //       } else newErrors.phoneNumber = "";

  //       break;
  //     case "nationalCode":
  //       if (value === "") {
  //         newErrors.nationalCode = "کدملی الزامی میباشد";
  //         isValid = false;
  //       } else if (!checkCodeMeli(value)) {
  //         newErrors.nationalCode = "فرمت کد ملی صحیح نمیباشد";
  //         isValid = false;
  //       } else newErrors.nationalCode = "";

  //       break;
  //     case "messageText":
  //       if (value === "") {
  //         newErrors.messageText = "متن پیام الزامی میباشد";
  //       } else if (value.length <= 8) {
  //         newErrors.messageText = "مقدار وارد شده کمتر از حد مجاز میباشد";
  //         isValid = false;
  //       } else newErrors.messageText = "";

  //       break;
  //     case "reCaptchaCode":
  //       if (value !== "") {
  //         newErrors.reCaptchaCode = "";
  //       } else newErrors.reCaptchaCode = "کد امنیتی الزامی میباشد";
  //       break;
  //     default:
  //       break;
  //   }
  //   setErrorMessage((prev) => {
  //     return { ...prev, ...newErrors };
  //   });
  // };

  // Validate For onChange Mode

  const validateFormOnChange = () => {
    const newErrors = {};
    let isValid = true;

    if (fullName === "") {
      newErrors.fullName = "نام و نام خانوادگی الزامی میباشد";
      isValid = false;
    } else if (fullName.length <= 5) {
      newErrors.fullName = "مقدار وارد شده کمتر از حد مجاز میباشد";
      isValid = false;
    } else newErrors.fullName = "";

    if (phoneNumber === "") {
      newErrors.phoneNumber = "شماره همراه الزامی میباشد";
      isValid = false;
    } else if (!isPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "فرمت شماره همراه صحیح نمیباشد";
      isValid = false;
    } else newErrors.phoneNumber = "";

    if (nationalCode === "") {
      newErrors.nationalCode = "کدملی الزامی میباشد";
      isValid = false;
    } else if (!checkCodeMeli(nationalCode)) {
      newErrors.nationalCode = "فرمت کد ملی صحیح نمیباشد";
      isValid = false;
    } else newErrors.nationalCode = "";

    if (messageText === "") {
      newErrors.messageText = "متن پیام الزامی میباشد";
    } else if (messageText.length <= 8) {
      newErrors.messageText = "مقدار وارد شده کمتر از حد مجاز میباشد";
      isValid = false;
    } else newErrors.messageText = "";

    if (systemType.length === 0) {
      newErrors.systemType = "نوع سیستم الزامی میباشد";
      isValid = false;
    }

    if (questionType.length === 0) {
      newErrors.questionType = "";
    } else newErrors.questionType = "نوع سیستم الزامی میباشد";
    isValid = false;

    setErrorMessage((prev) => {
      return { ...prev, ...newErrors };
    });
    return isValid;
  };

  const InputOnchangesHandler = (event) => {
    const { name, value } = event.target;

    // setReCaptchaCode(value);

    setFormStates({
      ...formStates,
      [name]: value,
    });

    validateFormOnChange();
  };

  const reCaptchaOnchangesHandler = (event) => {
    const { name, value } = event.target;

    validateFormOnChange(name, value);

    setReCaptchaCode(value);
  };

  const hanleSubmitForm = () => {
    SetIsBtnClicked(true);
    validateForm();
    if (validateFormOnChange() && validateForm() && isAnswersOk) {
      console.log("Submit", formStates);
    } else {
      console.log("خطا");
    }
  };

  const handleDynamicForm = (ans) => {
    if (ans[0]) {
      let obj;

      for (const [key, value] of Object.entries(ans[0])) {
        obj = { ...obj, [key]: value };
      }

      setFormStates({ ...formStates, ...obj });
    }
  };

  const handleErrorMessageDynamicform = (err) => {
    setErrorMessageDynamicform(err);
  };

  function ShowChangePassword() {
    setHiddenPass(false);
  }

  function SignOut() {
    data = { IsAuth: "false" };
    navigate(`/`);
  }

  function CheckAuth() {
    if (IsAuth == "false" || IsAuth == undefined) {
      navigate(`/`);
      return false;
    }
    return true;
  }

  function setSel(sel) {
    let s = [];
    questionInfo.forEach((d, i) => {
      if (d.value == sel) s[i] = true;
      setSelected(s);
    });
  }

  function findSel() {
    let ret;
    questionType.forEach((d, i) => {
      if (selected[i]) ret = d.value;
    });
    return ret;
  }

  return (
    <div
      className="TicketFormContainer"
      onLoad={() => {
        CheckAuth();
      }}
    >
      <Header ShowChangePassword={ShowChangePassword} SignOut={SignOut} />

      <div
        style={{
          display: isMobile ? "none" : "flex",
          width: "100%",
          height: "83vh",
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <div class="ItemContainer">
          <h2
            style={{
              paddingRight: "40px",
              color: "#808080",
              marginBottom: "0.5rem",
            }}
          >
            ثبت پیام
          </h2>
          <ul
            style={{
              fontSize: "13px",
              marginBottom: "1.3rem",
              paddingRight: "55px",
              color: "gray",
            }}
          >
            <li>ابتدا نوع سیستم را انتخاب کنید</li>
            <li>سپس نوع پیام را انتخاب کنید</li>
            <li>سپس اطلاعات صحیح را وارد کنید</li>
          </ul>

          <div className="newDarkhast">
            <div className="FormWrapper">
              {/* SelectIems Code Block */}
              <section className="FormLevel1">
                <div
                  className="colmd2"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <LabeledSelect
                    label="نوع سیستم"
                    items={[
                      {
                        title: "بستری در مراکز درمانی و بیمارستان ها",
                        value: 1,
                        fieldName: "Type",
                        questions: [
                          {
                            fieldName: "EllatBastarieBimeshode",
                            title: "علت بستری",
                            template: "ColStart2 ColEnd6",
                          },
                        ],
                      },
                    ]}
                    defaultValue={""}
                    disable
                    onChange={(val) => {
                      setActiveInput(true);
                      setFormStates((prev) => {
                        setErrorMessage({ ...errorMessage, systemType: "" });
                        return {
                          ...prev,
                          systemType: [...prev.systemType, val],
                        };
                      });
                    }}
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.systemType}
                    hasToshow={isBtnClicked}
                  />
                  {/* <div
                    id="error"
                    className={`ErrorMessageBox ${
                      errorMessage.systemType ? "ShakeAnimation" : null
                    }`}
                    style={{
                      opacity: !errorMessage.systemType ? 0 : 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    {errorMessage.systemType}
                  </div> */}
                </div>
                <div
                  className="colmd2"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <LabeledSelect
                    label="نوع پیام"
                    items={questionInfo}
                    selected={selected}
                    defaultValue={findSel()}
                    onChange={(sel) => setSel(sel)}
                    // disabled={!activeInput}
                    // onChange={(val) =>
                    //   setFormStates((prev) => {
                    //     setErrorMessage({ ...errorMessage, questionType: "" });

                    //     return {
                    //       ...prev,
                    //       questionType: [...prev.questionType, val],
                    //     };
                    //   })
                    // }
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.questionType}
                    hasToshow={isBtnClicked}
                  />
                  {/* <div
                    id="error"
                    className={`ErrorMessageBox ${
                      errorMessage.questionType ? "ShakeAnimation" : null
                    }`}
                    style={{
                      opacity: !errorMessage.questionType ? 0 : 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {activeInput ? (
                      <>
                        <FontAwesomeIcon icon={faCircleXmark} />
                        {errorMessage.questionType}
                      </>
                    ) : null}
                  </div> */}
                </div>
              </section>
              {/* SelectIems Code Block */}

              {/* MainInfoInputs Code Block */}
              <section className="FormLevel2">
                <div
                  className="colmd1"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <LabeledTextBox
                    label="نام و نام خانوادگی"
                    defaultValue={fullName}
                    name={"fullName"}
                    value={fullName}
                    onChange={(e) => InputOnchangesHandler(e)}
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.fullName}
                    hasToshow={isBtnClicked}
                  />
                </div>
                <div
                  className="colmd1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <LabeledTextBox
                    label="تلفن همراه"
                    defaultValue={phoneNumber}
                    name={"phoneNumber"}
                    value={phoneNumber}
                    onChange={(e) => InputOnchangesHandler(e)}
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.phoneNumber}
                    hasToshow={isBtnClicked}
                  />
                </div>
                <div
                  className="colmd1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <LabeledTextBox
                    label="کد ملی"
                    defaultValue={nationalCode}
                    name={"nationalCode"}
                    value={nationalCode}
                    onChange={(e) => InputOnchangesHandler(e)}
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.nationalCode}
                    hasToshow={isBtnClicked}
                  />
                </div>
              </section>
              {/* MainInfoInputs Code Block */}

              {/* DynamicInfoInputs Code Block */}
              <section className="FormLevel4">
                <div className="colmd1">
                  <QuestionsForm
                    items={questionInfo}
                    selectedItems={selected}
                    isMobile={isMobile}
                    initialValues={answers}
                    onChange={(ans, ok, err) => {
                      handleDynamicForm(ans);
                      // setAnswers(ans);
                      // answersDispatch({ type: "reasonsSetAnswer", payload: ans });
                      setIsAnswersOk(ok);
                      handleErrorMessageDynamicform(err);
                    }}
                    // onDeselect={() => onDeselect("reasons")}
                    gridTemplateColumns="auto auto auto"
                    errorMessage={errorMessageDynamicForm}
                    isBtnClicked={isBtnClicked}
                    errorText={error}
                  />
                </div>
              </section>
              {/* DynamicInfoInputs Code Block */}

              {/* MessageTextArea Code Block */}
              <section className="FormLevel2">
                <div
                  className="colmd1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <LabeledTextArea
                    label="شرح پیام"
                    defaultValue={messageText}
                    rows={6}
                    name={"messageText"}
                    value={messageText}
                    onChange={(e) => InputOnchangesHandler(e)}
                  />
                  <ErrorMessageShowBox
                    errorMessage={errorMessage.messageText}
                    hasToshow={isBtnClicked}
                  />
                </div>
              </section>
              {/* MessageTextArea Code Block */}

              {/* reCapcha Code Block */}
              <section className="FormLevel3">
                <ReCapcha
                  onChange={(e) => reCaptchaOnchangesHandler(e)}
                  errorMessage={errorMessage.reCaptchaCode}
                  reCaptchaCode={reCaptchaCode}
                />
              </section>
              {/* reCapcha Code Block */}
            </div>

            <div className="ButtonContainer">
              <Button
                style={{ width: "320px" }}
                class="ButtWidth"
                text="ثبت پیام"
                onClick={() => hanleSubmitForm()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
