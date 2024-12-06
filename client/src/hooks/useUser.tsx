import { loggedInAndData } from "@/api/authentication";
import { useEffect, useState } from "react";

const useUser = (deps?: any[]) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ msg: string; code: number } | null>(
    null,
  );
  useEffect(() => {
    setLoading(true);
    loggedInAndData()
      .then((res) => {
        if (!res.succeed) {
          setError({ msg: "User Not Logged In", code: 401 });
        } else {
          setUser(res.result);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError({ msg: "Something Went Wrong!", code: 500 });
      });
  }, [deps]);

  return [user, loading, error];
};

export default useUser;
