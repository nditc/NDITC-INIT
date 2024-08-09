import wait from "@/utils/wait";
import {
  FormEvent,
  FormEventHandler,
  LegacyRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

type props = {
  handler: (data: any) => Promise<any>;
  onSuccess?: (resp: any) => void;
  onError?: (error: any) => void;
  successMsg?: string;
  errorMsg?: string;
};

const useForm = ({
  handler,
  onSuccess,
  onError,
  successMsg,
  errorMsg,
}: props): [RefObject<HTMLFormElement>, boolean] => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    if (formRef && formRef.current) {
      try {
        setLoading(true);
        // await wait(5000);
        // console.log(e);
        const form = Array.from(new FormData(formRef.current));
        let data: any = {};
        form.forEach((s) => {
          data[s[0]] = s[1];
        });
        let response = await handler(data);
        if (onSuccess) {
          onSuccess(response);
        }

        formRef.current.reset();
        setLoading(false);
        toast.success(successMsg || "Submission Success!");
      } catch (err: any) {
        console.error(err);
        toast.error(errorMsg || err?.message || "Submission Failed!");

        if (onError) {
          onError(err);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current?.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleSubmit();
      });
    }
  }, []);
  return [formRef, loading];
};

export default useForm;
