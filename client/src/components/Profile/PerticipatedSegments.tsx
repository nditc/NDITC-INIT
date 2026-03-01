import React, { useContext, useMemo } from "react";
import ProfileTitle from "./ProfileTitle";
import UserContext from "@/context/UserContext";
import { isArray } from "lodash";
import EventCardProfile from "./EventCardProfile";

const ParticipatedSegments: React.FC = () => {
  const userData = useContext(UserContext);
  const participatedEvents = useMemo(() => {
    if (!isArray(userData?.clientEvents)) return [];

    const skippedKeys = new Set(["snack", "snacks", "lunch"]);
    return userData.clientEvents.filter(
      (eventKey: any) =>
        typeof eventKey === "string" && !skippedKeys.has(eventKey),
    );
  }, [userData?.clientEvents]);

  return (
    <div className="my-10">
      <ProfileTitle title="Participated Events" />

      {participatedEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {participatedEvents.map((name: string, index: number) => (
            <EventCardProfile name={name} index={index} key={name} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid h-32 min-h-32 w-full place-items-center rounded-2xl bg-gradient-to-br from-secondary-700 to-secondary-500/20 p-5 text-center text-white/60">
          You haven't participated in any event yet.
        </div>
      )}
    </div>
  );
};

export default ParticipatedSegments;
