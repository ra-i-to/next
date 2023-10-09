import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useCreatetUserRegistrationStatus } from "../hooks/userRegistrationStatus/createUserRegistrationStatus";
import UserInfoContext from "../contexts/UserInfoContext";
import { UserInfo } from "../model/UserInfo";
import { useGetUserRegistrationStatus } from "../hooks/userRegistrationStatus/getUserRegistrationStatus";
import ErrorPage from "./_error";

type Props = {};

const preRegistration = (props: Props) => {
  const router = useRouter();
  const context = useContext(UserInfoContext);
  const { auth0User, user, loading: contextLoading }: UserInfo = context;
  const [accountId, setAccountId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const { postUserRegistrationStatus } =
    useCreatetUserRegistrationStatus(accountId);
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
    const preRegistration = async () => {
      if (accountId) {
        const userRegistrationStatus = await fetchUserRegistrationStatus();
        if (userRegistrationStatus) {
          console.log("既に仮会員登録済み");
          router.push("/userInfoRegistration");
        } else {
          console.log("仮会員登録処理開始");
          const result = await postUserRegistrationStatus();
          if (result) {
            console.log("仮会員登録成功");
            console.log(result);
            router.push("/userInfoRegistration");
          } else {
            console.log("仮会員登録失敗");
            setMessage("仮会員登録に失敗しました。再度やり直してください。");
          }
        }
      }
    };
    if (accountId) {
      preRegistration();
    }
  }, [accountId]);
  return (
    <>
      <h2>仮会員登録</h2>
      {message && <p>{message}</p>}
    </>
  );
};

export default preRegistration;
