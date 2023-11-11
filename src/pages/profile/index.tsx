import { NextPage } from "next";
import React, {useContext, useEffect, useState} from "react";
import {UserInfo} from "@/src/model/UserInfo";
import {NextRouter, useRouter} from 'next/router';
import UserInfoContext from "@/src/contexts/UserInfoContext";
import {useGetLocation} from "@/src/hooks/location/getLocation";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import {Container, Grid, Box, useTheme, useMediaQuery} from "@mui/material";

type Props = {};

const profile: NextPage = (props: Props) => {
    const context = useContext(UserInfoContext);
    const { auth0User, user, loading: contextLoading }: UserInfo = context;
    const [userName, setUserName] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [profile, setProfile] = useState<string>("");
    const [locationId, setLocationId] = useState<string>("");
    const [location, setLocation] = useState(null);
    const { fetchLocation } = useGetLocation();
    const router : NextRouter = useRouter();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    //user情報取得(Auth0侧)
    useEffect(() => {
        if (contextLoading === false) {
            setLocationId(user?.locationId);
            setUserName(user?.name);
            if(user?.birth){
                const birthday = new Date(user?.birth)
                const yyyy:string = birthday.getFullYear();
                let mm = birthday.getMonth() + 1; // 月は0から始まるので1を足す
                let dd = birthday.getDate();
                if (mm < 10) mm = `0${mm}`;
                if (dd < 10) dd = `0${dd}`;
                setBirth(`${yyyy}年${mm}月${dd}日`);
            }
            setProfile(user?.profile);
        }
    }, [contextLoading]);

    //locations取得(local)
    useEffect(() => {
        const getLocation = async () => {
            setLocation(await fetchLocation(locationId));
        };
        if (locationId) {
            getLocation();
        }
    },[locationId]);

    return (
        <>
            <main>
                <Container
                    maxWidth="md"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isMobile ? "stretch" : "center",
                        width: isMobile ? "100%" : "900px",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                <Box mb={4}>
                                    <h2>Profile</h2>
                                </Box>
                                <p>{userName}</p>
                                <p>{location&&location.locationName}</p>
                                <p>{birth}</p>
                                <p>{profile}</p>
                                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => {
                                    router.push("profile/edit");
                                }}>
                                    編集
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    );
};


export default profile;
