import Input from "@/components/ui/form/Input";
import React from "react";

//In Event Submission "&&&&" can separate fields and automatically merged with comma later

const SubmissionInput = ({ data }: { data: any }) => {
  return (
    <>
      {data.submission !== "{}" ? (
        <>
          {JSON.parse(data.submission)
            .name.split("&&&&")
            .map((n: string, i: number) => {
              return (
                <Input
                  name={"submissionLink_" + i}
                  label={n}
                  required
                  key={i}
                />
              );
            })}
        </>
      ) : null}
    </>
  );
};

export default SubmissionInput;
