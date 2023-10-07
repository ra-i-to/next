import { NextPage } from "next";
import { Head } from "next/document";
import React from "react";
import Header from "../components/Header";

type Props = {};

const verifyEmailCheck: NextPage = (props: Props) => {
  return (
    <>
      <main>
        <div>
          <h2>メール検証確認画面</h2>
          <p>メールアドレスの検証を行ってください。</p>
        </div>
      </main>
    </>
  );
};

export default verifyEmailCheck;
