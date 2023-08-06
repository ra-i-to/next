import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

import React, { useRef, useState } from "react";

type Props = {
    handleMenuClose: any;
    menuOpenFlg: boolean;
};

const menuList = [
    { text: "ホーム", path: "/home", icon: HomeIcon, loggedin: true },
    {
        text: "プロフィール",
        path: "/profile",
        icon: AccountCircleIcon,
        loggedin: true,
    },
    {
        text: "ログイン",
        path: "/api/auth/login",
        icon: LoginIcon,
        loggedin: false,
    },
    {
        text: "新規登録",
        path: "/api/auth/login",
        icon: LoginIcon,
        loggedin: false,
    },
    {
        text: "ログアウト",
        path: "/api/auth/logout",
        icon: LogoutIcon,
        loggedin: true,
    },
];

const HeaderMenu = (props: Props) => {
    const { user, error, isLoading } = useUser();

    const router = useRouter();
    return (
        <>
            <Drawer anchor="left" open={props.menuOpenFlg} onClose={props.handleMenuClose}>
                <List>
                    {menuList.map((menu, index) => {
                        if ((menu.loggedin && user) || (!menu.loggedin && !user)) {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            router.push(menu.path);
                                        }}
                                    >
                                        <ListItemIcon>{React.createElement(menu.icon)}</ListItemIcon>
                                        <ListItemText primary={menu.text} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        }
                    })}
                </List>
            </Drawer>
        </>
    );
};

export default HeaderMenu;
