import { NextPage } from "next";
import { Head } from "next/document";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { before } from "node:test";
import { useGetLocations } from "../hooks/location/getLocations";
import NextLink from "next/link";
import { Location } from "../model/Location";
import UserInfoContext from "../contexts/UserInfoContext";
import { UserInfo } from "../model/UserInfo";
import { useRouter } from "next/router";
import { useGetUserRegistrationStatus } from "../hooks/userRegistrationStatus/getUserRegistrationStatus";

type Props = {};

const userInfoRegistration: NextPage = (props: Props) => {
  const context = useContext(UserInfoContext);
  const { auth0User, user, loading: contextLoading }: UserInfo = context;
  const [accountId, setAccountId] = useState<string | null>(null);
  const { fetchUserRegistrationStatus } =
    useGetUserRegistrationStatus(accountId);

  useEffect(() => {
    if (contextLoading === false) {
      const sub = auth0User?.sub;
      if (sub) {
        setAccountId(sub);
      }
    }
  }, [contextLoading]);

  const [userName, setUserName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const { fetchLocations } = useGetLocations();
  const [locations, setLocations] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [validateFlag, setValidateFlag] = useState(false);
  const [validateMessages, setValidateMessages] = useState<string[]>([]);

  const handleChageUserName = (value: string) => {
    setUserName(value);
  };
  const handleChageBirth = (value: string) => {
    setBirth(value);
  };
  const handleChageProfile = (value: string) => {
    setProfile(value);
  };
  const handleChageLocationId = (value: string) => {
    setLocationId(value);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function handleClickRegist() {
    setValidateFlag(false);
    setValidateMessages([]);
    if (!userName) {
      setValidateFlag(true);
      setValidateMessages((prev) => [
        ...prev,
        "ユーザー名を入力してください。",
      ]);
    }
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
        const date = new Date(year, month - 1, day);
        console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() !== day
        ) {
          setValidateMessages((prev) => [
            ...prev,
            "生年月日を正しく入力してください。",
          ]);
        }
      }

      // 本会員情報登録処理
    }
    if (!agreed) {
      setValidateMessages((prev) => [...prev, "利用規約に同意してください。"]);
    }

    if (validateMessages.length > 0) {
      setValidateFlag(true);
    }
  }

  useEffect(() => {
    const getLocations = async () => {
      setLocations(await fetchLocations());
    };
    getLocations();
  });

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
                  <h2>会員情報登録画面</h2>
                </Box>
                {validateFlag && (
                  <Box mb={4}>
                    <List>
                      {validateMessages.map((message, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={
                              <Typography color="error">{message}</Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                {/* ユーザ名 */}
                <Box mb={4}>
                  <div className="form-group">
                    <FormControl variant="outlined" fullWidth>
                      <TextField
                        label="ユーザー名"
                        variant="standard"
                        value={userName}
                        onChange={(e) => {
                          handleChageUserName(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                </Box>
                {/* 生年月日 */}
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
                          handleChageBirth(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                </Box>
                {/* プロフィールテキスト */}
                <Box mb={4}>
                  <div className="form-group">
                    <FormControl variant="outlined" fullWidth>
                      <TextField
                        label="プロフィール"
                        variant="standard"
                        value={profile}
                        onChange={(e) => {
                          handleChageProfile(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                </Box>
                {/* 所在地 */}
                <Box mb={4}>
                  <div className="form-group">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="location-label">所在地</InputLabel>
                      <Select
                        labelId="location-label"
                        value={locationId}
                        onChange={(e) => handleChageLocationId(e.target.value)}
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
                {/* 利用規約 同意 */}
                <Box
                  mb={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <div className="form-group">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          name="agreementCheckbox"
                        />
                      }
                      label={
                        <>
                          <NextLink href="/terms" passHref>
                            利用規約
                          </NextLink>
                          <span>に同意します</span>
                        </>
                      }
                    />
                  </div>
                </Box>
                {/* 登録ボタン */}
                <Box
                  mb={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <div className="form-group">
                    <Button
                      variant="contained"
                      disabled={!agreed}
                      onClick={handleClickRegist}
                    >
                      登録
                    </Button>
                  </div>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default userInfoRegistration;
