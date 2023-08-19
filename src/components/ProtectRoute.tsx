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
    if (!isLoading && user) {
        if (!user.email_verified && router.pathname !== "/api/auth/logout") {
            router.push("/signup");
        }
    }
    return children;
};

export default ProtectRoute;
