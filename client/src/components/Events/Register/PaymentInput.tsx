import Input from "@/components/ui/form/Input";
import Separator from "@/components/ui/Separator";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const PaymentInput = ({ data }: { data: any }) => {
  return (
    <>
      {data.paid ? (
        <>
          <div className="my-2 flex items-center justify-center gap-4 text-lg">
            <span className="text-primary-150">Payment Info</span>
          </div>
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            <Input
              divClass="flex-1"
              name="CTransactionNum"
              label={"Payment Number"}
              required
            />
            <div className="flex items-center gap-3">
              <Input
                divClass="flex-1"
                name="CtransactionId"
                label={"Trx ID"}
                required
              />
              <img
                src="https://play-lh.googleusercontent.com/1CRcUfmtwvWxT2g-xJF8s9_btha42TLi6Lo-qVkVomXBb_citzakZX9BbeY51iholWs"
                alt="bKash"
                className="aspect-square h-12 w-12 shrink-0 rounded-full object-cover"
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PaymentInput;
