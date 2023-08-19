import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

type Props = {};

const ProtectRoute = ({ children }) => {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // if (router.isReady && !user) {
    //   if (typeof window !== "undefined") {
    //     if (router.pathname !== "/api/auth/login") {
    //       router.push("/");
    //     }
    //   }
    // }

    // if (!isLoading && user) {
    //   if (!user.email_verified && router.pathname !== "/api/auth/logout") {
    //     router.push("/signup");
    //   }
    //   if (user.email_verified && router.pathname == "/") {
    //     router.push("/home");
    //   }
    // }

    // DBのユーザ情報確認
    // API呼び出しで確認
    // 以下ローカル環境用処理
    let userInfo = null;
    if (!isLoading && user) {
      if (user.sid) {
        // userInfo = getUserInfo(user.sid);
        userInfo = getUserInfo("1223asdfghjkl");
      }
    }
    console.log(userInfo);
  }, [isLoading]);

  const getUserInfo = async (userId) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    console.log(response);
    const { user } = await response.json();
    return user;
  };

  return children;
};

export default ProtectRoute;
