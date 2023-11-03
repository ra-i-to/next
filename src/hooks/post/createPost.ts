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
      // required item
      // const iData = new User(
      //   data.id,
      //   data.accountId,
      //   data.name,
      //   data.birth,
      //   data.profile,
      //   data.createdAt,
      //   data.updatedAt
      // );

      // optional item
      // if (data.deletedAt) {
      //   iData.deletedAt = data.deletedAt;
      // }

      // return iData;
      return true;
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return { postNewPost };
};
