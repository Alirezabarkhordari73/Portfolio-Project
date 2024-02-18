import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BimehStart, Layout, Page1 } from "../components/index";
import useAuth from "../hooks/useAuth";

import "./Ticketing.css";

const Ticketing = ({ isMobile }) => {
  const pagesGlobalOptions = {
    DATAFIELDKEY: "bimehma_data",
    LASTPAGEKEY: "lastPageNum",
    BaseUrlFaraplus: process.env.REACT_APP_API_BASE_URL_FARAPLUSE,
  };

  const { pageNum = 0 } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { auth } = useAuth();

  const pages = [Page1];

  // if (pageNum == 0 || isNaN(pageNum) || Number(pageNum) >= pages.length)
  //   return (
  //     <BimehStart
  //       isMobile={isMobile}
  //       onSetData={setData}
  //       globalOptions={pagesGlobalOptions}
  //     />
  //   );

  const PAGE = pages[pageNum];

  if (pageNum > 1 && !data[pagesGlobalOptions.LASTPAGEKEY]) {
    if (
      data[pagesGlobalOptions.LASTPAGEKEY] &&
      data[pagesGlobalOptions.LASTPAGEKEY] > 1
    )
      navigate(`/${data[pagesGlobalOptions.LASTPAGEKEY]}`);
    else {
      let prevData;
      try {
        const urlParams = new URLSearchParams(window.location.search);

        const token = urlParams.get("tok");
        const vahedCode = urlParams.get("VahedCode");
        prevData = JSON.parse(
          "{token:" + token + ",vahedCode:" + vahedCode + "}"
        );
      } catch (e) {}
      if (prevData && prevData[pagesGlobalOptions.LASTPAGEKEY] >= pageNum - 1) {
        setData(prevData);
      } else navigate(`/`);
    }
  }

  return (
    <Layout>
      <PAGE
        pageNum={pageNum}
        data={auth}
        isMobile={isMobile}
        onSetData={setData}
        globalOptions={pagesGlobalOptions}
      />
    </Layout>
  );
};

export default Ticketing;
