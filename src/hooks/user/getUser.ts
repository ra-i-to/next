import { useState, useEffect } from "react";
import { User } from "../../model/User";

export const useGetUser = (accountId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
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
          data.user.id,
          data.user.accountId,
          data.user.name,
          data.user.birth,
          data.user.profile,
          data.user.createdAt,
          data.user.updatedAt
        );

        // optional item
        if (data.user.deletedAt) {
          iData.deletedAt = data.user.deletedAt;
        }

        setUser(iData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred:"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [accountId]);

  return { user, loading, error };
};
