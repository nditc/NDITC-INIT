import Input from "@/components/ui/form/Input";
import { verify_event_coupon } from "@/api/events";
import React, { useEffect, useState } from "react";
import {
  calculateRegisterCostBreakdown,
  useRegisterFormContext,
} from "./RegisterFormContext";

const toNumber = (value: unknown, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

type CouponStatus = {
  provided: boolean;
  code: string;
  isValid: boolean;
  flatDiscountAmount: number;
  status: string;
  message: string;
};

const PaymentInput = ({ data }: { data: any }) => {
  const {
    totalMembers,
    coupon,
    transactionNum,
    transactionId,
    setCoupon,
    setTransactionId,
    setTransactionNum,
    setCostStructure,
    setPayableAmount,
  } = useRegisterFormContext();
  const [couponStatus, setCouponStatus] = useState<CouponStatus | null>(null);
  const [isCouponChecking, setIsCouponChecking] = useState(false);
  const [couponFlatDiscountAmount, setCouponFlatDiscountAmount] = useState(0);

  useEffect(() => {
    const couponCode = coupon.trim();
    if (!couponCode) {
      setCouponStatus(null);
      setCouponFlatDiscountAmount(0);
      setIsCouponChecking(false);
      return;
    }

    let isCancelled = false;
    const timeoutId = setTimeout(async () => {
      try {
        setIsCouponChecking(true);
        const response: any = await verify_event_coupon({
          eventId: data?.id,
          eventName: data?.value,
          coupon: couponCode,
          totalMembers,
        });

        if (isCancelled) return;

        const status = response?.couponStatus;
        const flatDiscountAmount = toNumber(status?.flatDiscountAmount);
        const safeFlatDiscountAmount = Math.max(0, flatDiscountAmount);

        setCouponStatus(
          status || {
            provided: true,
            code: couponCode,
            isValid: false,
            flatDiscountAmount: 0,
            status: "invalid",
            message: "Invalid coupon",
          },
        );
        setCouponFlatDiscountAmount(safeFlatDiscountAmount);
      } catch (error: any) {
        if (isCancelled) return;

        setCouponStatus({
          provided: true,
          code: couponCode,
          isValid: false,
          flatDiscountAmount: 0,
          status: "error",
          message: error?.message || "Could not verify coupon",
        });
        setCouponFlatDiscountAmount(0);
      } finally {
        if (!isCancelled) {
          setIsCouponChecking(false);
        }
      }
    }, 450);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [coupon, data?.id, data?.value]);

  const fee = toNumber(data?.fee);
  const additionalFee = toNumber(data?.additionalFee);
  const maxMemberBaseFee = toNumber(data?.maxMemberBaseFee, 1);
  const discountFlatAmount = Math.max(0, couponFlatDiscountAmount);
  const {
    baseFeeAmount,
    additionalParticipants,
    additionalMemberFeeAmount,
    grossAmount,
    discountAmount,
    payableAmount,
  } = calculateRegisterCostBreakdown(
    fee,
    additionalFee,
    totalMembers,
    maxMemberBaseFee,
    discountFlatAmount,
  );

  const roundedBaseFeeAmount = Math.max(0, Math.round(baseFeeAmount));
  const roundedAdditionalMemberFeeAmount = Math.max(
    0,
    Math.round(additionalMemberFeeAmount),
  );
  const roundedGrossAmount = Math.max(0, Math.round(grossAmount));
  const roundedDiscountAmount = Math.max(0, Math.round(discountAmount));
  const roundedPayableAmount = Math.max(0, Math.round(payableAmount));
  const shouldShowCompactSummary =
    roundedBaseFeeAmount === roundedGrossAmount &&
    roundedGrossAmount === roundedPayableAmount;

  useEffect(() => {
    const nextCostStructure = {
      baseFeeAmount,
      additionalParticipants,
      additionalMemberFeeAmount,
      grossAmount,
      discountAmount,
      payableAmount,
    };

    setCostStructure(nextCostStructure);
    setPayableAmount(payableAmount);
  }, [
    baseFeeAmount,
    additionalParticipants,
    additionalMemberFeeAmount,
    grossAmount,
    discountAmount,
    payableAmount,
    setCostStructure,
    setPayableAmount,
  ]);

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
              value={transactionNum}
              onChange={(e) => setTransactionNum(e.currentTarget.value)}
            />
            <div className="flex items-center gap-3">
              <Input
                divClass="flex-1"
                name="CtransactionId"
                label={"Trx ID"}
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.currentTarget.value)}
              />
              <img
                src="https://play-lh.googleusercontent.com/1CRcUfmtwvWxT2g-xJF8s9_btha42TLi6Lo-qVkVomXBb_citzakZX9BbeY51iholWs"
                alt="bKash"
                className="aspect-square h-12 w-12 shrink-0 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <Input
              divClass="w-fit"
              name="CCoupon"
              label={"Coupon Code"}
              value={coupon}
              onChange={(e) => setCoupon(e.currentTarget.value)}
            />
            {coupon.trim() ? (
              <p
                className={
                  "text-sm " +
                  (isCouponChecking
                    ? "text-white/60"
                    : couponStatus?.isValid
                      ? "text-green-300"
                      : "text-red-300")
                }
              >
                {isCouponChecking
                  ? "Checking coupon..."
                  : couponStatus?.message || "Invalid coupon"}
              </p>
            ) : null}

            <table className="w-full">
              <tbody className="">
                {!shouldShowCompactSummary ? (
                  <tr>
                    <td className="font-medium">Base Fee:</td>
                    <td className="text-right">{roundedBaseFeeAmount} ৳</td>
                  </tr>
                ) : null}
                {!shouldShowCompactSummary && additionalParticipants > 0 ? (
                  <tr>
                    <td className="font-medium">
                      Additional Member Fee ({additionalParticipants}):
                    </td>
                    <td className="text-right">
                      {roundedAdditionalMemberFeeAmount} ৳
                    </td>
                  </tr>
                ) : null}
                {!shouldShowCompactSummary ? (
                  <tr className="font-bold">
                    <td>Gross Amount:</td>
                    <td className="text-right">{roundedGrossAmount} ৳</td>
                  </tr>
                ) : null}
                {!shouldShowCompactSummary && roundedDiscountAmount > 0 && (
                  <tr>
                    <td className="font-medium">Discount:</td>
                    <td className="text-right">{roundedDiscountAmount} ৳</td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td>Total Payable:</td>
                  <td className="text-right">{roundedPayableAmount} ৳</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PaymentInput;
