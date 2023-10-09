import { UserRegistrationStatus } from "../../model/UserRegistrationStatus";

export const useCreatetUserRegistrationStatus = (accountId: string) => {
  const postUserRegistrationStatus = async () => {
    try {
      if (!accountId) {
        return null;
      }
      const response = await fetch("/api/userRegistrationStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: accountId,
          preRegisteredAt: new Date(),
        }),
      });

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

  return { postUserRegistrationStatus };
};
