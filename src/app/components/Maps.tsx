"use client";

import React, { useEffect, useState } from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { database } from "../../../firebase-config";
import { ref, get, set } from "firebase/database";
import { getNameCombination, mapStyles } from "./helpers";

type LabelsType = {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: number;
};

const MapsComponent: React.FC = () => {
  const [labels, setLabels] = useState<LabelsType[]>([]);

  //   const [preparedData, setPreparedData] = useState<any>({
  //     localtion: "",
  //     time: "",
  //     next: {},
  //   });

  const setData = (data: LabelsType[]): void => {
    const dataRef = ref(database, `/quest`);

    set(dataRef, data).catch((error) => {
      console.error("Error set data:", error);
    });
  };

  const getData = (): void => {
    const dataRef = ref(database, "/");

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLabels(snapshot.val().quest || []);
        }
      })
      .catch((error) => {
        console.error("Error get data:", error);
      });
  };

  //   const neededStructure = (preparedData: LabelsType[]) => {
  //     setClick((prev) => prev + 1);

  //     setPreparedData((prev: any) => {
  //       const newQuest = {
  //         location: `Lat: ${preparedData?.[click].location.lat} Lng: ${preparedData?.[click].location.lng} `,
  //         time: preparedData?.[click].timestamp,
  //         next: {},
  //       };

  //       let currentQuest = prev;

  //       for (let i = 0; i <= click; i++) {
  //         const questKey = `quest-${i}`;
  //         if (!currentQuest.next[questKey]) {
  //           currentQuest.next[questKey] =
  //             i !== click
  //               ? newQuest
  //               : {
  //                   time: preparedData[0].timestamp,
  //                   location: `Lat: ${preparedData?.[0].location.lat} Lng: ${preparedData?.[0].location.lng} `,
  //                   next: {},
  //                 };
  //         }

  //         currentQuest = currentQuest.next[questKey];
  //       }

  //       return { ...prev };
  //     });
  //   };

  const handleClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const data = [
        ...labels,
        {
          id: labels.length + 1,
          name: getNameCombination(labels.length),
          location: {
            lat: lat,
            lng: lng,
          },
          timestamp: Date.now(),
        },
      ];

      setLabels(data);

      setData(data);

      //   neededStructure(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB4HygClK1SQyvS1BrH3TkHoe9bnEezVZo">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={{
            lat: 12.97,
            lng: 77.59,
          }}
          onClick={handleClick}
        >
          {labels.map((item) => (
            <Marker
              key={item.name}
              position={item.location}
              label={item.name}
            />
          ))}
          <Marker
            position={{
              lat: 12.97,
              lng: 77.59,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapsComponent;
