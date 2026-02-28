import Input from "@/components/ui/form/Input";
import React from "react";
import { useRegisterFormContext } from "./RegisterFormContext";

//In Event Submission "&&&&" can separate fields and automatically merged with comma later

const SubmissionInput = ({ data }: { data: any }) => {
  const { submissionLabels, submissionLinks, setSubmissionLinkAt } =
    useRegisterFormContext();

  return (
    <>
      {data.submission !== "{}" ? (
        <>
          {submissionLabels.map((n: string, i: number) => {
            return (
              <Input
                name={"submissionLink_" + i}
                label={n}
                required
                key={i}
                value={submissionLinks[i] || ""}
                onChange={(e) => setSubmissionLinkAt(i, e.currentTarget.value)}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default SubmissionInput;
