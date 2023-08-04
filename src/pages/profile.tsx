import { NextPage } from "next";
import { Head } from "next/document";
import React from "react";
import Header from "../components/Header";

type Props = {};

const profile: NextPage = (props: Props) => {
  return (
    <>
      <main>
        <div>
          <h2>Profile</h2>
        </div>
      </main>
    </>
  );
};

export default profile;
