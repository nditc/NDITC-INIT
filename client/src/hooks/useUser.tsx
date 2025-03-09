import { getFullData, loggedInAndData } from "@/api/authentication";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { useEffect, useState } from "react";

const useUser = (fullData?: boolean, deps?: any[]) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ msg: string; code: number } | null>(
    null,
  );
  useEffect(
    () => {
      setLoading(true);
      (async () => {
        try {
          const res = await loggedInAndData();
          if (!res.succeed) {
            setError({ msg: "User Not Logged In", code: 401 });
          } else {
            if (fullData) {
              const fullResp = await getFullData(res.result.userName);
              Object.keys(fullResp.result.ParEvent).map((key) => {
                const val = fullResp.result.ParEvent[key];
                fullResp.result.ParEvent[key] = parseConditionalJSON(val);
              });
              setUser({ ...fullResp.result, ...res.result });
            } else {
              setUser(res.result);
            }
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          setError({ msg: "Something Went Wrong!", code: 500 });
        }
      })();
    },
    deps ? deps : [],
  );

  return [user, loading, error];
};

export default useUser;
