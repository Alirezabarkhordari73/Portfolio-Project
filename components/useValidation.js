import React, { useEffect, useState } from "react";

const useValidation = () => {
  const [isValid, setIsValid] = useState(false);
  const [object, setObject] = useState({});
  const [error, setError] = useState({
    isRequired: "",
    isNumeric: "",
    isStringNullOrEmpty: "",
    isDatetime: "",
  });

  // method for handle validation oprations
  const validationFunc = (validateMethods, val) => {
    let result = { ok: false, msg: "" };
    const validations = [
      isRequired,
      isNumeric,
      isStringNullOrEmpty,
      isDatetime,
    ];

    validateMethods.forEach((element) => {
      validations.forEach((func) => {
        if (element.method === func.name) {
          if (func(val) === true) {
            setObject((prev) => ({ ...prev, [func.name]: true }));
            setError((prev) => ({ ...prev, [func.name]: "" }));
          } else {
            setObject((prev) => ({ ...prev, [func.name]: false }));
            setError((prev) => ({ ...prev, [func.name]: element.errorMsg }));
          }
        }
      });
    });

    result = { ok: isValid, msg: error, validateMethods: validateMethods };
    return result;
  };

  useEffect(() => {
    if (Object.keys(object).length === 0) return;
    if (Object.values(object).every((item) => item === true)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [object, error]);

  // validation methods
  const isRequired = (val) => {
    if (val) {
      return true;
    } else {
      return false;
    }
  };

  const isNumeric = (val) => {
    if (isNaN(val)) {
      return false;
    } else {
      return true;
    }
  };

  const isStringNullOrEmpty = (val) => {
    if (isNaN(val)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const isDatetime = (val) => {
    const date = new Date(val);

    if (Object.prototype.toString.call(date) === "[object Date]") {
      if (isNaN(date.getTime())) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  };

  const isPhoneNumber = (number) => {
    var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    var result = regex.test(number);
    return result;
  };

  const checkCodeMeli = (code) => {
    var L = code.length;

    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ("0000" + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  };

  return { validationFunc, error, isValid, isPhoneNumber, checkCodeMeli };
};

export default useValidation;
