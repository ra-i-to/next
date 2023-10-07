import React, { useEffect, useState } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { UserContext, UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import { useGetUser } from "../hooks/user/getUser";

type Props = {
  children: React.ReactNode;
};

const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [auth0User, setAuth0User] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {
    user: iAuth0User,
    error: auth0Error,
    isLoading: auth0Loading,
  }: UserContext = useUser();
  const {
    user: iUser,
    loading: Loading,
    error: Error,
  } = useGetUser(typeof iAuth0User?.sid === "string" ? iAuth0User?.sid : "");

  useEffect(() => {
    if (auth0Error) {
      // throw new Error(auth0Error.message);
    } else if (!auth0Loading && user) {
      setAuth0User(user);
    }

    if (Error) {
      // throw iError;
    } else if (!Loading && iUser) {
      setUser(iUser);
    }
  }, [auth0Loading, Loading]);

  return (
    <UserInfoContext.Provider
      value={{ auth0User, setAuth0User, user, setUser }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default GlobalStateProvider;
