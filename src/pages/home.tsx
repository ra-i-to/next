import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const home: NextPage = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <main>
        <div>
          <h2>Home</h2>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/post/create");
            }}
          >
            New Post
          </Button>
        </div>
      </main>
    </>
  );
};

export default home;
