import { Box, Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import PostList from "../components/PostList";

type Props = {};

const home: NextPage = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <main>
        <div>
          <h2>Home</h2>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/post/create");
              }}
            >
              New Post
            </Button>
          </Box>
          <Box>
            <PostList />
          </Box>
        </div>
      </main>
    </>
  );
};

export default home;
