import { NextPage } from "next";
import React, {useContext, useEffect, useState} from "react";
import {
    Container,
    Grid,
    Box,
    useMediaQuery,
    useTheme,
    FormControl,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    Alert,
    Collapse
} from "@mui/material";
import UserInfoContext from "@/src/contexts/UserInfoContext";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import {UserInfo} from "@/src/model/UserInfo";
import {useGetLocation} from "@/src/hooks/location/getLocation";
import { useUpdateUser } from "../../hooks/user/updateUser";
import {Location} from "@/src/model/Location";
import {useGetLocations} from "@/src/hooks/location/getLocations";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
type Props = {};



const edit: NextPage = (props: Props) => {
    const context = useContext(UserInfoContext);
    const { auth0User, user, loading: contextLoading }: UserInfo = context;
    const [id, setId] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [birth, setBirth] = useState<string>("");
    const [profile, setProfile] = useState<string>("");
    const [locationId, setLocationId] = useState<string>("");
    const [location, setLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const { fetchLocation } = useGetLocation();
    const { fetchLocations } = useGetLocations();
    const { updateUser } = useUpdateUser();
    const [validateFlag, setValidateFlag] = useState(false);
    const [validateMessages, setValidateMessages] = useState<string[]>([]);
    const [agreed, setAgreed] = useState(false);
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    //user情報取得(Auth0侧)
    useEffect(() => {
        if (contextLoading === false) {
            setId(user?.id);
            setLocationId(user?.locationId);
            setUserName(user?.name);
            setBirth(user?.birth);
            if(user?.birth){
                const birthday = new Date(user?.birth)
                const yyyy:string = birthday.getFullYear();
                let mm = birthday.getMonth() + 1; // 月は0から始まるので1を足す
                let dd = birthday.getDate();
                if (mm < 10) mm = `0${mm}`;
                if (dd < 10) dd = `0${dd}`;
                setBirth(`${yyyy}${mm}${dd}`);
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

    useEffect(() => {
        const getLocations = async () => {
            setLocations(await fetchLocations());
        };
        getLocations();
    });

    const handleChangeUserName = (value: string) => {
        setUserName(value);
    };
    const handleChangeLocationId = (value: string) => {
        setLocationId(value);
    };
    const handleChangeBirth = (value: string) => {
        setBirth(value);
    };
    const handleChangeProfile = (value: string) => {
        setProfile(value);
    };


    const handleClickUpdate = async () => {
        // 入力チェック
        setValidateFlag(false);
        setValidateMessages([]);
        if (!userName) {
            setValidateFlag(true);
            setValidateMessages((prev) => [
                ...prev,
                "ユーザー名を入力してください。",
            ]);
        }
        let birthDate = null;
        if (!birth) {
            setValidateMessages((prev) => [...prev, "生年月日を入力してください。"]);
        } else {
            const birthRegex = /^\d{8}$/;
            if (!birthRegex.test(birth)) {
                setValidateMessages((prev) => [
                    ...prev,
                    "生年月日を「YYYYMMDD」の形式で入力してください。",
                ]);
            } else {
                const year = parseInt(birth.substring(0, 4), 10);
                const month = parseInt(birth.substring(4, 6), 10);
                const day = parseInt(birth.substring(6, 8), 10);
                birthDate = new Date(year, month - 1, day);
                if (
                    birthDate.getFullYear() !== year ||
                    birthDate.getMonth() + 1 !== month ||
                    birthDate.getDate() !== day
                ) {
                    setValidateMessages((prev) => [
                        ...prev,
                        "生年月日を正しく入力してください。",
                    ]);
                }
            }
        }

        if (validateMessages.length > 0) {
            setValidateFlag(true);
            return;
        }

        // ユーザデータ更新
        const result = await userUpdate(
            id,
            userName,
            locationId,
            birthDate,
            profile
        );

        console.log("本会員登録処理結果", result);

        if (result) {
            //アラート表示
            setOpen(true);
        }
    };

    //ユーザデータ更新
    const userUpdate = async (
        id: string,
        name: string,
        locationId:string,
        birth: Date | null,
        profile: string
    ) => {
       const result =  await updateUser(id, name, locationId, birth, profile);
        if(result){
            console.log("ok");
            return result;
        } else {
            console.log("not ok");
        }
    };

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
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    プロフィールの更新ができました。
                                </Alert>
                            </Collapse>
                            <div>
                                <Box mb={4}>
                                <h2>profile-edit</h2>
                                </Box>
                                <Box mb={4}>
                                    <div className="form-group">
                                        <FormControl variant="outlined" fullWidth>
                                            <TextField
                                                label="ユーザー名"
                                                variant="standard"
                                                value={userName}
                                                onChange={(e) => handleChangeUserName(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box mb={4}>
                                    <div className="form-group">
                                        <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="location-label">所在地</InputLabel>
                                        <Select
                                            labelId="location-label"
                                            value={locationId}
                                            onChange={(e) => handleChangeLocationId(e.target.value)}
                                            label="所在地"
                                        >
                                            <MenuItem value="">
                                                <em>未選択</em>
                                            </MenuItem>
                                            {locations &&
                                                locations.map((location: Location) => (
                                                    <MenuItem key={location.id} value={location.id}>
                                                        {location.locationName}{" "}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box mb={4}>
                                    <div className="form-group">
                                        <FormControl variant="outlined" fullWidth>
                                            <TextField
                                                label="生年月日"
                                                variant="standard"
                                                placeholder="YYYYMMDD"
                                                inputProps={{
                                                    maxLength: 8,
                                                }}
                                                value={birth}
                                                onChange={(e) => {
                                                    handleChangeBirth(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box mb={4}>
                                    <div className="form-group">
                                        <FormControl variant="outlined" fullWidth>
                                            <TextField
                                                label="自己紹介"
                                                variant="standard"
                                                value={profile}
                                                onChange={(e) => {
                                                    handleChangeProfile(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </Box>
                                <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickUpdate}>
                                    保存
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
        </main>
        </>
    );
};

export default edit;
