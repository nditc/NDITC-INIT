import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

type props = {
  handler: (data: any, formData?: false | FormData | undefined) => Promise<any>;
  onSuccess?: (resp: any) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
  successMsg?: string;
  errorMsg?: string;
  formData?: boolean;
  populate?: string[];
  formDataProcess?: (formData: FormData) => FormData;
};

/*
  How to use this hook?

  This Hook returns A FormRef and loading state

  call api inside handler function;

  other props are verbose

  this hook will return formdata in object form if you dont set formdata to true

  please add  name_index  end of any  input name if you want them in an array
  also add name in populate
*/

const useForm = (
  {
    populate,
    handler,
    onSuccess,
    onError,
    onEnd,
    successMsg,
    errorMsg,
    formData,
    formDataProcess,
  }: props,
  deps?: any[],
): [RefObject<HTMLFormElement>, boolean] => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async () => {
    if (formRef && formRef.current) {
      try {
        setLoading(true);
        // await wait(5000);
        // console.log(e);
        const formD = new FormData(formRef.current);

        let processedFormD = formD;

        if (formData && formD && formDataProcess) {
          processedFormD = formDataProcess(formD);
        }

        let form: [any, any][] = Array.from(processedFormD);
        let data: any = {};

        // populates input values if have same name shared and included in populated option
        if (populate) {
          populate.forEach((s) => {
            let values: FormDataEntryValue[] = [];
            form = form.filter((ss, i) => {
              if (ss[0].includes(s)) {
                values.push(ss[1]);
                return false;
              } else {
                return true;
              }
            });

            if (values.length > 0) {
              form.push([s, values]);
            }
          });
        }

        form.forEach((s) => {
          if (typeof s[1] == "string") {
            data[s[0]] = s[1].trim();
          } else {
            data[s[0]] = s[1];
          }
        });

        let response = await handler(data, formData && processedFormD);
        if (onSuccess) {
          onSuccess(response);
        }

        formRef.current.reset();
        setLoading(false);
        toast.success(
          successMsg ||
            response?.msg ||
            response?.message ||
            "Submission Success!",
        );
        if (onEnd) {
          onEnd();
        }
      } catch (err: any) {
        console.dir(JSON.stringify(err));
        toast.error(
          errorMsg || err?.msg || err?.message || "Submission Failed!",
        );

        if (onError) {
          onError(err);
        }
        setLoading(false);
        if (onEnd) {
          onEnd();
        }
      }
    }
  }, [
    errorMsg,
    formData,
    formDataProcess,
    handler,
    onEnd,
    onError,
    onSuccess,
    populate,
    successMsg,
  ]);

  useLayoutEffect(() => {
    if (formRef && formRef.current) {
      formRef.current?.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleSubmit();
      });
    }
  }, [...(deps || [])]);
  return [formRef, loading];
};

export default useForm;
