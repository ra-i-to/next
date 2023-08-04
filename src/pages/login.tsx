import { NextPage } from "next";
import { Head } from "next/document";
import React from "react";
import Header from "../components/Header";

type Props = {};

const login: NextPage = (props: Props) => {
  return (
    <>
      <main>
        <div>
          <h2>Login</h2>
        </div>
      </main>
    </>
  );
};

export default login;
