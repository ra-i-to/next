import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { User } from "../model/User";
import { UserInfo } from "../model/UserInfo";

const defaultUserInfo: UserInfo = {
  auth0User: null,
  // setAuth0User: () => {},
  user: null,
  // setUser: () => {},
  loading: null,
};

const UserInfoContext = createContext<UserInfo>(defaultUserInfo);

export default UserInfoContext;
