import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderMenu from "./HeaderMenu";
import { useRouter } from "next/router";

type Props = {};

const Header = (props: Props) => {
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const [menuOpenFlg, setMenuOpenFlg] = useState<boolean>(false);

  const handleMenuClick = () => {
    setMenuOpenFlg(!menuOpenFlg);
  };

  const handleMenuClose = () => {
    setMenuOpenFlg(false);
  };

  useEffect(() => {}, [isLoading]);

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {(() => {
                return (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenuClick}
                  >
                    <MenuIcon />
                  </IconButton>
                );
              })()}

              <HeaderMenu
                handleMenuClose={handleMenuClose}
                menuOpenFlg={menuOpenFlg}
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                App
              </Typography>
              {(() => {
                if (!user) {
                  return (
                    <Button
                      color="inherit"
                      onClick={() => {
                        router.push("/api/auth/login");
                      }}
                    >
                      ログイン
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      color="inherit"
                      onClick={() => {
                        router.push("/api/auth/logout");
                      }}
                    >
                      ログアウト
                    </Button>
                  );
                }
              })()}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  );
};

export default Header;
