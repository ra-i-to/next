import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Post } from "../model/Post";
import { useGetPosts } from "../hooks/post/getPosts";
import Masonry from "@mui/lab/Masonry";

type Props = {};

const PostList = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { fetchPosts } = useGetPosts();

  useEffect(() => {
    const getPosts = async () => {
      const postsArray = await fetchPosts();
      console.log(postsArray);
      setPosts(postsArray);
    };
    getPosts();
  }, []);

  const containerRef = useRef();
  const { width } = useResizeObserver(containerRef);

  // コンテナの幅に基づいて列数を計算
  const getColumnsCount = (containerWidth) => {
    if (containerWidth < 300) return 1;
    if (containerWidth < 600) return 2;
    if (containerWidth < 900) return 3;
    if (containerWidth < 1200) return 4;
    return 5;
  };

  const columns = getColumnsCount(width);

  return (
    <>
      <Box ref={containerRef}>
        <Masonry columns={columns} spacing={2}>
          {posts.map((post, index) => (
            <Box key={index}>
              <img
                src={post.photos[0].url}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Masonry>
      </Box>
    </>
  );
};

export default PostList;

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0 });

  useLayoutEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};
