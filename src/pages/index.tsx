import React from "react";
import { useFetchRandomNumber } from "@/api/property/queries";
import { useTranslation } from "react-i18next";

const Home = () => {
  const test = useFetchRandomNumber();
  const { t } = useTranslation();

  if (test.isLoading) {
    return <>Loading...</>;
  }

  return <div>{t("salutaion", { name: "there" })}</div>;
};

export default Home;
