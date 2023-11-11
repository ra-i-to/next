import { User } from "../../model/User";

export const useUpdateUser = () => {
    const updateUser = async (
        id: string,
        name: string,
        locationId:string,
        birth: Date | null,
        profile: string
    ) => {
        try {
            const response = await fetch(`/api/users`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,
                    userData:{
                        name: name,
                        locationId: locationId,
                        birth: birth,
                        profile: profile,
                    }
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const iData = new User(
                data.id,
                data.accountId,
                data.name,
                data.birth,
                data.profile,
                data.createdAt,
                data.updatedAt
            );
            if (data.deletedAt) {
                iData.deletedAt = data.deletedAt;
            }
            return iData;
        }catch (e:unknown){
            console.error(e);
        }
    };
    return { updateUser };
}