import { useEffect, useState } from "react";

const useFetch = (
  {
    fn,
    params,
    onSuccess,
    onError,
  }: {
    fn: (...args: any[]) => Promise<any>;
    params?: any[];
    onSuccess?: (resp: any) => void;
    onError?: (error: any) => void;
  },
  deps?: any[],
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fn(...(params || []))
      .then((resp) => {
        if (!resp.succeed) {
          setError(resp.msg);
          onError && onError(resp.msg);
        } else {
          setData(resp.result);
          onSuccess && onSuccess(resp.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        onError && onError(err);
        setLoading(false);
      });
  }, [deps]);

  return [data, loading, error];
};

export default useFetch;
