"use client";
import ErrorPage2 from "@/components/common/error/ErrorPage2";
import ErrorPage1 from "@/components/common/error/ErrorPage1";
import ErrorPage3 from "@/components/common/error/ErrorPage3";
import ErrorPage4 from "@/components/common/error/ErrorPage4";
import ErrorPage5 from "@/components/common/error/ErrorPage5";
import ErrorPage6 from "@/components/common/error/ErrorPage6";

const NotFound = () => {
  const errorPage = Math.floor(Math.random() * 6) + 1;

  return (
    <>
      {errorPage === 1 && <ErrorPage1 />}
      {errorPage === 2 && <ErrorPage2 />}
      {errorPage === 3 && <ErrorPage3 />}
      {errorPage === 4 && <ErrorPage4 />}
      {errorPage === 5 && <ErrorPage5 />}
      {errorPage === 6 && <ErrorPage6 />}
    </>
  );
};

export default NotFound;
