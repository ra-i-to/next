import { User } from "../../model/User";

export const useGetUser = (accountId: string) => {
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/users" + "?accountId=" + accountId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ accountId: accountId }),
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

  return { fetchUser };
};
