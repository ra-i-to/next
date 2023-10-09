import { UserProfile } from "@auth0/nextjs-auth0/client";
import { User } from "../model/User";

export type UserInfo = {
  auth0User: UserProfile | null;
  // setAuth0User: (user: UserProfile | null) => void;
  user: User | null;
  // setUser: (user: User | null) => void;
  loading: boolean | null;
};
