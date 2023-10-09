import React, { useContext, useEffect, useState } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { UserInfo } from "../model/UserInfo";
import { useRouter } from "next/router";
import { useGetUserRegistrationStatus } from "../hooks/userRegistrationStatus/getUserRegistrationStatus";

type Props = {};

const auth0Callback = (props: Props) => {
  const context = useContext(UserInfoContext);
  const { auth0User, user, loading: contextLoading }: UserInfo = context;
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const { fetchUserRegistrationStatus } =
    useGetUserRegistrationStatus(accountId);

  useEffect(() => {
    if (contextLoading === false) {
      const sub = auth0User?.sub;
      if (sub) {
        setAccountId(sub);
      }
    }
  }, [contextLoading]);

  useEffect(() => {
    const auth0Redirect = async () => {
      if (accountId) {
        let path = "";
        if (!auth0User) {
          // auth0通信失敗 or URL直打ちアクセス => トップ画面
          path = "/";
        } else {
          if (!auth0User.email_verified) {
            // auth0メール未検証 => メール検証画面
            path = "/verifyEmailCheck";
          } else if (user) {
            // 本会員登録済み => ホーム画面
            path = "/home";
          } else {
            // 仮会員情報取得

            const userRegistrationStatus = await fetchUserRegistrationStatus();
            if (!userRegistrationStatus) {
              // 仮会員未登録 => 仮会員登録処理
              path = "/preRegistration";
            } else {
              // 仮会員未登録の場合、仮会員登録処理
              // 本会員未登録 => 会員情報登録画面
              path = "/userInfoRegistration";
            }
          }
        }
        setRedirectPath(path);
        router.push(path);
      }
    };
    auth0Redirect();
  }, [accountId]);
  return (
    <>
      {/* ローディングアニメーションなど配置予定 */}
      <h2>auth0Callback Page</h2>
      <p>Redirect To {redirectPath}</p>
      <p>auth0user: {auth0User ? "ログイン中" : "未ログイン"}</p>
      <p>user: {user ? "ログイン中" : "未ログイン"}</p>
    </>
  );
};

export default auth0Callback;
