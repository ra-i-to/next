import { Location } from "../../model/Location";

export const useGetLocation = () => {
    const fetchLocation = async (locationId) => {
        try {
            const response = await fetch("/api/locations/"+locationId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const iData = new Location(
                data.id,
                data.locationName,
                data.createdAt,
                data.updatedAt
            );
            // optional item
            if (data.deletedAt) {
                iData.deletedAt = data.deletedAt;
            }
            return iData;
        } catch (err) {
            console.error(err);
        }
    };

    return { fetchLocation };
};
