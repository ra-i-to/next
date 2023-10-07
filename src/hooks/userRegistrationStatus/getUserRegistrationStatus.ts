import { useState, useEffect } from "react";
import { UserRegistrationStatus } from "../../model/UserRegistrationStatus";

export const useGetUserRegistrationStatus = (accountId: string) => {
  const [userRegistrationStatus, setUserRegistrationStatus] =
    useState<UserRegistrationStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserRegistrationStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/userRegistrationStatus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accountId: accountId }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // required item
        const iData = new UserRegistrationStatus(
          data.userRegistrationStatus.id,
          data.userRegistrationStatus.accountId,
          data.userRegistrationStatus.preRegisteredAt,
          data.userRegistrationStatus.createdAt,
          data.userRegistrationStatus.updatedAt
        );

        // optional item
        if (data.userRegistrationStatus.registeredAt) {
          iData.registeredAt = data.userRegistrationStatus.registeredAt;
        }

        if (data.userRegistrationStatus.deletedAt) {
          iData.deletedAt = data.userRegistrationStatus.deletedAt;
        }

        setUserRegistrationStatus(iData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRegistrationStatus();
  }, [accountId]);

  return [userRegistrationStatus, loading, error];
};
