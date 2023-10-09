import React, { useEffect, useState } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { UserContext, UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useGetUser } from "../hooks/user/getUser";
import { User } from "../model/User";

type Props = {
  children: React.ReactNode;
};

const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [auth0User, setAuth0User] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accountId, setAccountId] = useState<string | null>(null);

  const {
    user: iAuth0User,
    error: iAuth0Error,
    isLoading: iAuth0Loading,
  }: UserContext = useUser();
  const { fetchUser } = useGetUser(accountId);

  useEffect(() => {
    if (iAuth0Error) {
      console.error(iAuth0Error);
    } else if (!iAuth0Loading && iAuth0User) {
      setAuth0User(iAuth0User);
      if (iAuth0User.sub) {
        setAccountId(iAuth0User.sub);
      }
    }
  }, [iAuth0Loading]);

  useEffect(() => {
    const getUser = async () => {
      const iUser = await fetchUser();
      setUser(iUser);
      setLoading(false);
    };
    if (accountId) {
      getUser();
    }
  }, [accountId]);

  return (
    <UserInfoContext.Provider value={{ auth0User, user, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default GlobalStateProvider;
