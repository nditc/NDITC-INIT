import { getFullData, loggedInAndData } from "@/api/authentication";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useUser = (fullData?: boolean, deps?: any[]) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ msg: string; code: number } | null>(
    null,
  );
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await loggedInAndData();
        if (!res.succeed) {
          if (!isCancelled) {
            setLoading(false);
            setUser(null);
            setError({ msg: "User Not Logged In", code: 401 });
          }
        } else {
          if (fullData) {
            const fullResp = await getFullData(res.result.userName);
            const normalizedResult = fullResp?.result
              ? { ...fullResp.result }
              : {};
            const parEvent = normalizedResult?.ParEvent;

            if (parEvent && typeof parEvent === "object") {
              Object.keys(parEvent).forEach((key) => {
                parEvent[key] = parseConditionalJSON(parEvent[key]);
              });
            } else {
              normalizedResult.ParEvent = {};
            }

            if (!isCancelled) {
              setUser({ ...normalizedResult, ...res.result });
            }
          } else {
            if (!isCancelled) {
              setUser(res.result);
            }
          }
          if (!isCancelled) {
            setLoading(false);
            setError(null);
          }
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) {
          setLoading(false);
          setError({ msg: "Something Went Wrong!", code: 500 });
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [...(deps || []), fullData]);

  return [user, loading, error];
};

export default useUser;
