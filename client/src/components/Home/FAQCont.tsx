import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import FAQ from "./FAQ";
import { getAllFAQ } from "@/api/faq";

const FAQCont = async () => {
  const { result } = await getAllFAQ();
  return (
    <section id="faq" className="h-fit flex-1 pb-16 text-center">
      <div className="container">
        <h1 className="title title-top mx-auto mb-5">
          <BsQuestionCircle className="text-primary mr-3 inline h-8 w-8 align-top text-primary-300 md:h-10 md:w-10" />
          <span className="text-center">FAQ </span>
        </h1>
      </div>
      <FAQ FAQS={result} />
    </section>
  );
};

export default FAQCont;
