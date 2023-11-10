import { Photo } from "@/src/model/Photo";
import { Post } from "@/src/model/Post";

export const useCreatePost = () => {
  const postNewPost = async (
    accountId: string,
    file: File,
    cameraMaker: string,
    cameraModel: string,
    lensMaker: string,
    lensModel: string,
    exposureTime: string,
    fNumber: string,
    iso: string,
    focalLength: string,
    shotDate: Date | undefined | null,
    shotLocation: string | null
  ) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "data",
        JSON.stringify({
          accountId: accountId,
          metadata: {
            cameraMaker: cameraMaker,
            cameraModel: cameraModel,
            lensMaker: lensMaker,
            lensModel: lensModel,
            exposureTime: exposureTime.toString(),
            fNumber: fNumber.toString(),
            iso: iso.toString(),
            focalLength: focalLength.toString(),
            shotDate: shotDate,
            shotLocation: shotLocation,
          },
        })
      );

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      const photo = data.photo;
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

      const post = data.post;
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
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return { postNewPost };
};
