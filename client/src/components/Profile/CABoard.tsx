import fetchJSON from "@/api/fetchJSON";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";

const CABoard = () => {
  const userData = useContext(UserContext);

  return (
    <div className="rounded-3xl bg-primary-550 px-5 py-10 text-white shadow-lg md:px-16">
      {userData.isCA ? <div>CA Code:{userData.caData.code}</div> : null}
    </div>
  );
};

export default CABoard;
