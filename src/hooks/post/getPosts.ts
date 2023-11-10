import { Photo } from "@/src/model/Photo";
import { Post } from "../../model/Post";

export const useGetPosts = () => {
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const PostsArray = data.map((postData: Post) => {
        const photo = postData.photos[0];
        const iPhoto = new Photo(
          photo.id,
          photo.postId,
          photo.url,
          photo.createdAt,
          photo.updatedAt
        );
        if (photo.cameraMaker) {
          iPhoto.cameraMaker = photo.cameraMaker;
        }
        if (photo.cameraModel) {
          iPhoto.cameraModel = photo.cameraModel;
        }
        if (photo.lensMaker) {
          iPhoto.lensMaker = photo.lensMaker;
        }
        if (photo.lensModel) {
          iPhoto.lensModel = photo.lensModel;
        }
        if (photo.exposureTime !== undefined) {
          iPhoto.exposureTime = photo.exposureTime;
        }
        if (photo.fNumber !== undefined) {
          iPhoto.fNumber = photo.fNumber;
        }
        if (photo.iso !== undefined) {
          iPhoto.iso = photo.iso;
        }
        if (photo.focalLength !== undefined) {
          iPhoto.focalLength = photo.focalLength;
        }
        if (photo.shotDate) {
          iPhoto.shotDate = photo.shotDate;
        }
        if (photo.shotLocation) {
          iPhoto.shotLocation = photo.shotLocation;
        }
        if (photo.deletedAt) {
          iPhoto.deletedAt = photo.deletedAt;
        }

        const post = postData;
        const iPost = new Post(
          post.id,
          post.accountId,
          [],
          photo.createdAt,
          photo.updatedAt
        );
        if (photo.deletedAt) {
          iPhoto.deletedAt = photo.deletedAt;
        }
        if (iPhoto) {
          iPost.addPhoto(iPhoto);
        }
        return iPost;
      });
      return PostsArray;
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchPosts };
};
