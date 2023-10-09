import { UserRegistrationStatus } from "../../model/UserRegistrationStatus";

export const useGetUserRegistrationStatus = (accountId: string) => {
  const fetchUserRegistrationStatus = async () => {
    try {
      const response = await fetch(
        "/api/userRegistrationStatus" + "?accountId=" + accountId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // required item
      const iData = new UserRegistrationStatus(
        data.id,
        data.accountId,
        data.preRegisteredAt,
        data.createdAt,
        data.updatedAt
      );

      // optional item
      if (data.registeredAt) {
        iData.registeredAt = data.registeredAt;
      }

      if (data.deletedAt) {
        iData.deletedAt = data.deletedAt;
      }

      return iData;
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchUserRegistrationStatus };
};
