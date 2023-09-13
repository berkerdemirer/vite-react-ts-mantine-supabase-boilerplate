import React from "react";
import { useFetchRandomNumber } from "@/api/property/queries";

const Home = () => {
  const test = useFetchRandomNumber();

  if (test.isLoading) {
    return <>Loading...</>;
  }

  return <div>Home</div>;
};

export default Home;
