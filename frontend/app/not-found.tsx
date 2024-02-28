"use client";
import ErrorPage1 from "@/components/common/error/ErrorPage1";
import ErrorPage2 from "@/components/common/error/ErrorPage2";
import ErrorPage3 from "@/components/common/error/ErrorPage3";
import ErrorPage4 from "@/components/common/error/ErrorPage4";
import ErrorPage5 from "@/components/common/error/ErrorPage5";
import ErrorPage6 from "@/components/common/error/ErrorPage6";

const errorPages = [
  ErrorPage1,
  ErrorPage2,
  ErrorPage3,
  ErrorPage4,
  ErrorPage5,
  ErrorPage6,
];

const NotFound = () => {
  const errorPage = Math.floor(Math.random() * 6);
  const PageComponent = errorPages[errorPage] || ErrorPage1;

  return <PageComponent />;
};

export default NotFound;
