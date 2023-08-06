import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
// import Router from "next/router";
import { useRouter } from "next/router";

type Props = {};

const ProtectRoute = ({ children }) => {
    const router = useRouter();

    const { user, error, isLoading } = useUser();
    if (router.isReady && !user) {
        if (typeof window !== "undefined") {
            if (router.pathname !== "/api/auth/login") {
                router.push("/");
            }
        }
    }
    return children;
};

export default ProtectRoute;
