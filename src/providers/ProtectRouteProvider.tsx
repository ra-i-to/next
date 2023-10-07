import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserContext } from "@auth0/nextjs-auth0/client";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useGetUser } from "../hooks/user/getUser";
import { useGetUserRegistrationStatus } from "../hooks/userRegistrationStatus/getUserRegistrationStatus";

type Props = {};

// type auth0Response {
//   user: UserProfile | undefined;
//   error: Error | undefined;
//   isLoading: boolean;
// }

const ProtectRouteProvider = ({ children }) => {
  const router = useRouter();

  // const { user, error, isLoading }: UserContext = useUser();
  // const [iUser, loading, _error] = useGetUser(
  //   typeof user?.sid === "string" ? user?.sid : ""
  // );

  // useEffect(() => {
  // DBのユーザ情報確認
  // API呼び出しで確認
  // 以下ローカル環境用処理

  // const userRouting = async () => {
  // let userInfo = null;
  // if (!isLoading && user) {
  //   console.log(user);
  //   console.log(user.email_verified);
  //   console.log(iUser);
  //   if (user.sid && typeof user.sid === "string") {
  // 仮会員確認
  // const [userRegistrationStatus] = useGetUserRegistrationStatus(
  //   user.sid
  // );
  // if (!userRegistrationStatus) {
  //   // 仮会員登録
  //   if (user.email_verified) {
  //     // ユーザー情報登録画面へ遷移
  //   } else {
  //     // メール検証画面へ遷移
  //   }
  // }
  // if (iUser) {
  //   // 本会員登録済み
  //   // ローカル環境では本・仮で分けてないため一旦コメント
  //   // router.push("/home");
  //   // return;
  // } else {
  //   // 仮会員登録されているかのチェック
  //   // 仮会員登録されていない場合は仮会員登録処理実行後次に進む
  // }
  // 会員情報登録画面作成のため無条件で画面遷移
  // router.push("/userInfoRegistration");
  // return;
  // if (user.email_verified) {
  //   // メール検証済み
  //   router.push("/userInfoRegistration");
  //   return;
  // } else {
  //   // メール認証未検証
  //   router.push("/verifyEmailCheck");
  //   return;
  // }
  //       }
  //     }
  //   };
  //   userRouting();
  // }, [isLoading, user, iUser]);

  return children;
};

export default ProtectRouteProvider;
