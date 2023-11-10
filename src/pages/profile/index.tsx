import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { UserInfo } from "@/src/model/UserInfo";
import UserInfoContext from "@/src/contexts/UserInfoContext";
import { useGetLocations } from "@/src/hooks/location/getLocations";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

type Props = {};

const profile: NextPage = (props: Props) => {
  const context = useContext(UserInfoContext);
  const { auth0User, user, loading: contextLoading }: UserInfo = context;
  const [userName, setUserName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [locations, setLocations] = useState([]);
  const { fetchLocations } = useGetLocations();

  //user情報取得(Auth0侧)
  useEffect(() => {
    if (contextLoading === false) {
      setLocationId(user?.locationId);
      const birthday = new Date(user?.birth);
      if (birthday) {
        const yyyy = birthday.getFullYear();
        const mm = birthday.getMonth() + 1;
        const dd = birthday.getDate();
        console.log(yyyy, mm, dd);
      }
    }
  }, [contextLoading]);

  //locations取得(local)
  useEffect(() => {
    const getLocations = async () => {
      setLocations(await fetchLocations());
    };
    getLocations();
  });
  return (
    <>
      <main>
        <div>
          <h2>Profile</h2>
          <List>
            {locations &&
              locations.map((location) =>
                location.id === locationId ? (
                  <ListItem key={location.id}>{location.locationName}</ListItem>
                ) : null
              )}
          </List>
        </div>
      </main>
    </>
  );
};

export default profile;
