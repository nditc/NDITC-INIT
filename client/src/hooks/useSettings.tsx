import { getFullData, loggedInAndData } from "@/api/authentication";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useSettings = (deps?: any[]) => {
  const [Settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ msg: string; code: number } | null>(
    null,
  );
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetchJSON(reqs.GET_ALL_SETTING);
        if (!res.succeed) {
          setLoading(false);
          setSettings(null);
          setError({ msg: "Something Went Wrong!", code: 500 });
        } else {
          setLoading(false);
          setSettings(res?.result[0]);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError({ msg: "Something Went Wrong!", code: 500 });
      }
    })();
  }, [...(deps || [])]);

  return [Settings, loading, error];
};

export default useSettings;
