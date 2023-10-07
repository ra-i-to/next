import React, { useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Drawer, List, ListItem, ListItemButton, IconButton, Box, ListItemIcon, ListItemText} from '@mui/material';
import { DarkMode, LightMode, Login, Logout, Home, AccountCircle } from "@mui/icons-material";
import { ThemeStatus,ThemeStatusContext } from "@/src/contexts/ThemeStatusContext";
import {createTheme} from "@mui/material/styles";

type Props = {
    handleMenuClose: any;
    menuOpenFlg: boolean;
};

const menuList = [
    {   text: "ホーム",
        path: "/home",
        icon: Home,
        loggedin: true,
    },
    {
        text: "プロフィール",
        path: "/profile",
        icon: AccountCircle,
        loggedin: true,
    },
    {
        text: "ログイン",
        path: "/api/auth/login",
        icon: Login,
        loggedin: false,
    },
    {
        text: "新規登録",
        path: "/api/auth/login",
        icon: Login,
        loggedin: false,
    },
    {
        text: "ログアウト",
        path: "/api/auth/logout",
        icon: Logout,
        loggedin: true,
    },
];

const HeaderMenu = (props: Props) => {
    const { user, error, isLoading } = useUser();

    const router = useRouter();
    const { themeStatus, setThemeStatus } = useContext(ThemeStatusContext);
    const handleIconToggle = () => {
        setThemeStatus((prev:ThemeStatus) => (prev === 'light' ? 'dark' : 'light'));
    };
    const themeContant = ()=>{
        if (themeStatus==='light'){
           return <LightMode/>;
        } else if (themeStatus==='dark'){
            return <DarkMode />;
        }
    }
    return (
        <>
            <Drawer anchor="left" open={props.menuOpenFlg} onClose={props.handleMenuClose}>
                <List style={{flex:1}}>
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
                <Box mt={2} display="flex" justifyContent="center">
                    <IconButton aria-label="themeflag" onClick={handleIconToggle}>
                        {themeContant()}
                    </IconButton>
                </Box>
            </Drawer>
        </>
    );
};

export default HeaderMenu;
