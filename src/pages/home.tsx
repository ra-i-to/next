import { NextPage } from "next";
import { Head } from "next/document";
import React from "react";
import Header from "../components/Header";

type Props = {};

const home: NextPage = (props: Props) => {
  return (
    <>
      <main>
        <div>
          <h2>Home</h2>
        </div>
      </main>
    </>
  );
};

export default home;
