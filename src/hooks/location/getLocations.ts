import { Location } from "../../model/Location";

export const useGetLocations = () => {
  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const LocationsArray = data.map(
        (locationData: {
          id: string;
          locationName: string;
          createdAt: Date;
          updatedAt: Date;
          deletedAt?: Date | null | undefined;
        }) => {
          // required item
          const iData = new Location(
            locationData.id,
            locationData.locationName,
            locationData.createdAt,
            locationData.updatedAt
          );

          // optional item
          if (locationData.deletedAt) {
            iData.deletedAt = locationData.deletedAt;
          }

          return iData;
        }
      );
      return LocationsArray;
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchLocations };
};
