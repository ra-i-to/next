import { User } from "../../model/User";

export const useCreateUser = () => {
  const postUser = async (
    accountId: string,
    name: string,
    birth: Date | null,
    profile: string
  ) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: accountId,
          name: name,
          birth: birth,
          profile: profile,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      //// required item
      const iData = new User(
        data.id,
        data.accountId,
        data.name,
        data.birth,
        data.profile,
        data.createdAt,
        data.updatedAt
      );

      // optional item
      if (data.deletedAt) {
        iData.deletedAt = data.deletedAt;
      }

      return iData;
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return { postUser };
};
