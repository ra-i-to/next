import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";

type UserInfo = {
  auth0User: UserProfile | null;
  setAuth0User: (user: UserProfile | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserInfoContext = createContext<UserInfo | undefined>(undefined);

export default UserInfoContext;
