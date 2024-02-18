import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { LabeledTextBox } from "./bControls";
import "./QuestionsForm.css";
import DatePicker, {
  formatJalaliDate,
  parseJalaiDate,
} from "../../controls/DatePicker";
import LabeledSelect from "./LabeledSelect";

const ADDCIRCLE = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 14.1094H20.2222"
      stroke="#BCBCBC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1094 8V20.2222"
      stroke="#BCBCBC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 27C21.1798 27 27 21.1798 27 14C27 6.8203 21.1798 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1798 6.8203 27 14 27Z"
      stroke="#BCBCBC"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CLOSEICON = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 1L1 14"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 1L14 14"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function QuestionsForm({
  items,
  initialValues,
  selectedItems,
  onChange,
  onDeselect,
  style,
  gridTemplateColumns,
  isMobile,
  multiAnswer = false,
  errorMessage,
  isBtnClicked,
  errorText,
}) {
  let [answers, setAnswers] = useState(
    initialValues && Array.isArray(initialValues) ? initialValues : []
  );

  useEffect(() => {
    answers = answers.filter((a) =>
      items.reduce(
        (res, item, i) =>
          res || (a[item.fieldName] == item.value && selectedItems[i]),
        false
      )
    );
    setAnswers(answers);
    const [ok, err] = checkAnswers(answers);
    onChange(answers, ok, err);
  }, [
    selectedItems,
    errorText.isRequired,
    errorText.isNumeric,
    errorText.isDatetime,
  ]);

  function setAnswer(i, ans) {
    if (selectedItems[i]) {
      ans.forEach((a) => (a[items[i].fieldName] = items[i].value));
      answers = [...answers]
        .filter((a) => a[items[i].fieldName] != items[i].value)
        .concat(ans);

      setAnswers(answers);
      const [ok, err] = checkAnswers(answers);
      onChange(answers, ok, err);
    }
  }

  function checkAnswers(A) {
    let ok = true;
    let error = [];

    function validate(val, q) {
      const validatorResult = q.validator
        ? q.validator(val)?.ok
        : val
        ? true
        : false;

      if (!validatorResult) {
        ok = false;

        if (q.errorMessage) {
          error = [
            ...error,
            { fieldName: q.fieldName, errorMsg: q.errorMessage },
          ];
        }
      }

      if (!q.errorMessage) {
        error = [
          ...error,
          {
            fieldName: q.fieldName,
            errorMsg:
              (errorText.isNumeric && errorText.isNumeric) ||
              (errorText.isDatetime && errorText.isDatetime) ||
              (errorText.isRequired && errorText.isRequired),
          },
        ];
      }
    }

    A.forEach((a) => {
      const i = items.findIndex((it) => a[it.fieldName] == it.value);
      if (Array.isArray(items[i].questions))
        items[i].questions.forEach((q) => {
          if (Array.isArray(a[q.fieldName]))
            a[q.fieldName].forEach((v) => validate(v, q));
          else validate(a[q.fieldName], q);
        });
    });

    return [ok, error];
  }

  function onDesel(i) {
    const newAnswers = answers.filter(
      (a) => a[items[i].fieldName] != items[i].value
    );
    setAnswers(newAnswers);
    onChange(newAnswers, checkAnswers(newAnswers));
    onDeselect(i);
  }

  return (
    <div
      className="QuestionsForm"
      style={
        gridTemplateColumns
          ? { gridTemplateColumns: gridTemplateColumns, ...style }
          : style
      }
    >
      {items.reduce(
        (res, item, i) =>
          selectedItems[i] &&
          Array.isArray(item.questions) &&
          item.questions.length > 0
            ? [
                ...res,
                <>
                  <Question
                    isBtnClicked={isBtnClicked}
                    errorMessage={errorMessage}
                    key={item.title}
                    multiAnswer={multiAnswer}
                    item={item}
                    noHeader={item.noHeader}
                    onChange={(ans) => setAnswer(i, ans)}
                    onDeselect={() => onDesel(i)}
                    isMobile={isMobile}
                    errorText={errorText}
                    initialValues={answers.filter(
                      (v) =>
                        item.fieldName in v && v[item.fieldName] == item.value
                    )}
                  />
                  {isMobile && i < items.length - 1 ? <hr /> : ""}
                </>,
              ]
            : res,
        []
      )}
    </div>
  );
}

export function Question({
  multiAnswer,
  item,
  noHeader,
  onChange,
  onDeselect,
  isMobile,
  initialValues,
  errorMessage,
  isBtnClicked,
  errorText,
}) {
  const [numAnswers, setNumAnswers] = useState(initalNumAnswers());
  const [answers, setAnswers] = useState(initialAnswers());

  function initalNumAnswers() {
    if (
      initialValues &&
      Array.isArray(initialValues) &&
      initialValues.length > 0
    )
      return initialValues.length;
    else return 1;
  }

  function initialAnswers() {
    if (
      initialValues &&
      Array.isArray(initialValues) &&
      initialValues.length > 0
    )
      return initialValues;
    else return [{}];
  }

  function modify(i, j, v) {
    answers[i][j] = v;
    setAnswers([...answers]);
  }

  useEffect(() => {
    onChange(answers);
  }, [answers]); ///notify parent

  function questionElement(q, i) {
    const key = q.fieldName + i;
    if (q.type == "Date")
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <DatePicker
            key={key}
            lable={q.title}
            className={q.template}
            value={parseJalaiDate(answers[i][q.fieldName])}
            onChange={(D) => modify(i, q.fieldName, formatJalaliDate(D))}
          />
          <div
            style={{
              width: "100%",
              height: "38px",
            }}
          >
            {errorMessage.map((item, i) => {
              if (item.fieldName === q.fieldName && isBtnClicked === true) {
                return (
                  <div
                    key={i}
                    className={`ErrorMessageBox ${
                      item.errorMsg ? "ShakeAnimation" : null
                    }`}
                    id="error"
                    style={{
                      opacity: item.errorMsg ? 1 : 0,
                      display: "flex",
                      width: "250px",
                      height: "100%",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    {item.errorMsg}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    id="error"
                    style={{
                      width: "250px",
                    }}
                  ></div>
                );
              }
            })}
          </div>
        </div>
      );
    else if (q.type == "Select")
      return (
        <LabeledSelect
          key={key}
          label={q.title}
          className={q.template}
          items={q.items}
          defaultValue={answers[i][q.fieldName]}
          onChange={(v) => modify(i, q.fieldName, v)}
        />
      );
    else
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <LabeledTextBox
            key={key}
            placeholder={q.title}
            label={q.title}
            className={q.template}
            value={answers[i][q.fieldName]}
            onChange={(e) => modify(i, q.fieldName, e.target.value)}
          />
          <div
            style={{
              width: "100%",
              height: "38px",
            }}
          >
            {errorMessage.map((item, i) => {
              if (item.fieldName === q.fieldName && isBtnClicked === true) {
                return (
                  <div
                    key={i}
                    className={`ErrorMessageBox ${
                      item.errorMsg ? "ShakeAnimation" : null
                    }`}
                    id="error"
                    style={{
                      opacity: item.errorMsg ? 1 : 0,
                      display: "flex",
                      width: "250px",
                      height: "100%",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                    {item.errorMsg}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    id="error"
                    style={{
                      width: "250px",
                    }}
                  ></div>
                );
              }
            })}
          </div>
        </div>
      );
  }

  if (!numAnswers > 0)
    //error prevention guard
    return <></>;

  return new Array(numAnswers).fill(0).map((_, i) => (
    <>
      {noHeader ? (
        ""
      ) : (
        <div className="QuestionHeader">
          {i == numAnswers - 1 ? (
            <div
              className="CloseBut"
              onClick={() => {
                if (Array.isArray(answers)) answers.pop();
                if (numAnswers > 1) {
                  setNumAnswers(numAnswers - 1);
                  onChange(answers);
                } else onDeselect();
              }}
            >
              {CLOSEICON}
            </div>
          ) : (
            ""
          )}
          {item.title}
        </div>
      )}
      {item.questions.map((q, j) => questionElement(q, i, j))}

      {i == numAnswers - 1 && multiAnswer && !item.noMultiAnswer ? (
        <AddButton
          onClick={() => {
            answers[numAnswers] = {};
            setNumAnswers(numAnswers + 1);
            onChange(answers);
          }}
        />
      ) : isMobile ? (
        <hr />
      ) : (
        ""
      )}
    </>
  ));
}

function AddButton({ onClick }) {
  return (
    <div className="AddCircle" onClick={onClick}>
      {ADDCIRCLE}
      <div style={{ fontSize: "12px", marginTop: "-4px" }}>افزودن</div>
    </div>
  );
}
