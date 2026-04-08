import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type RegisterEventData = {
  value?: string;
  team?: boolean;
  submission?: string;
  minMember?: number | null;
  maxMember?: number | null;
  paid?: boolean;
  fee?: number | string | null;
  additionalFee?: number | string | null;
  maxMemberBaseFee?: number | string | null;
  discountPercentage?: number | string | null;
};

export type RegisterCostStructure = {
  baseFeeAmount: number;
  additionalParticipants: number;
  additionalMemberFeeAmount: number;
  grossAmount: number;
  discountAmount: number;
  payableAmount: number;
};

type RegisterFormContextType = {
  eventData: RegisterEventData;
  teamName: string;
  members: string[];
  submissionLabels: string[];
  submissionLinks: string[];
  transactionNum: string;
  transactionId: string;
  coupon: string;
  discountPercentage: number;
  payableAmount: number;
  costStructure: RegisterCostStructure;
  totalMembers: number;
  minAdditionalMembers: number;
  maxAdditionalMembers: number;
  setTeamName: (value: string) => void;
  addMember: () => void;
  removeMember: (index: number) => void;
  setMemberAt: (index: number, value: string) => void;
  setSubmissionLinkAt: (index: number, value: string) => void;
  setTransactionNum: (value: string) => void;
  setTransactionId: (value: string) => void;
  setCoupon: (value: string) => void;
  setPayableAmount: (value: number) => void;
  setCostStructure: (value: RegisterCostStructure) => void;
};

const RegisterFormContext = createContext<RegisterFormContextType | null>(null);

const parseSubmissionLabels = (submission: string | undefined) => {
  if (!submission || submission === "{}") return [];

  try {
    const parsed = JSON.parse(submission);
    if (!parsed?.name) return [];
    return String(parsed.name)
      .split("&&&&")
      .map((label) => label.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
};

const toNumber = (value: unknown, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const calculateRegisterCostBreakdown = (
  fee: number,
  additionalFee: number,
  currentMembers: number,
  maxMemberBaseFee: number,
  flatDiscountAmount: number,
): RegisterCostStructure => {
  const safeFee = Math.max(0, fee);
  const safeAdditionalFee = Math.max(0, additionalFee);
  const safeCurrentMembers = Math.max(1, currentMembers);
  const safeMaxMemberBaseFee = Math.max(0, maxMemberBaseFee);
  const safeFlatDiscountAmount = Math.max(0, flatDiscountAmount);

  const additionalParticipants = Math.max(
    0,
    safeCurrentMembers - safeMaxMemberBaseFee,
  );
  const baseFeeAmount = safeFee;
  const additionalMemberFeeAmount = safeAdditionalFee * additionalParticipants;
  const grossAmount = baseFeeAmount + additionalMemberFeeAmount;
  const discountAmount = Math.min(grossAmount, safeFlatDiscountAmount);
  const payableAmount = grossAmount - discountAmount;

  return {
    baseFeeAmount,
    additionalParticipants,
    additionalMemberFeeAmount,
    grossAmount,
    discountAmount,
    payableAmount,
  };
};

const getInitialCostStructure = (eventData: RegisterEventData) =>
  calculateRegisterCostBreakdown(
    toNumber(eventData?.fee),
    toNumber(eventData?.additionalFee),
    1,
    toNumber(eventData?.maxMemberBaseFee, 1),
    0,
  );

export const RegisterFormProvider = ({
  eventData,
  children,
}: {
  eventData: RegisterEventData;
  children: React.ReactNode;
}) => {
  const initialMembers: string[] = [];
  const initialCostStructure = getInitialCostStructure(eventData);

  const submissionLabels = useMemo(
    () => parseSubmissionLabels(eventData?.submission),
    [eventData?.submission],
  );
  const minAdditionalMembers = Math.max(0, toNumber(eventData?.minMember, 1) - 1);
  const maxAdditionalMembers = Math.max(0, toNumber(eventData?.maxMember) - 1);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>(initialMembers);
  const [submissionLinks, setSubmissionLinks] = useState<string[]>(
    submissionLabels.map(() => ""),
  );
  const [transactionNum, setTransactionNum] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payableAmount, setPayableAmount] = useState(
    initialCostStructure.payableAmount,
  );
  const [costStructure, setCostStructure] =
    useState<RegisterCostStructure>(initialCostStructure);

  useEffect(() => {
    const resetMembers: string[] = Array(minAdditionalMembers).fill("");
    const resetCostStructure = getInitialCostStructure(eventData);

    setTeamName("");
    setMembers(resetMembers);
    setSubmissionLinks(submissionLabels.map(() => ""));
    setTransactionNum("");
    setTransactionId("");
    setCoupon("");
    setPayableAmount(resetCostStructure.payableAmount);
    setCostStructure(resetCostStructure);
  }, [
    eventData?.value,
    eventData?.team,
    submissionLabels,
    minAdditionalMembers,
  ]);

  const addMember = () => {
    setMembers((current) => {
      if (current.length >= maxAdditionalMembers) return current;
      return [...current, ""];
    });
  };

  const removeMember = (index: number) => {
    setMembers((current) => current.filter((_, i) => i !== index));
  };

  const setMemberAt = (index: number, value: string) => {
    setMembers((current) =>
      current.map((entry, i) => (i === index ? value : entry)),
    );
  };

  const setSubmissionLinkAt = (index: number, value: string) => {
    setSubmissionLinks((current) =>
      current.map((entry, i) => (i === index ? value : entry)),
    );
  };

  const discountPercentage = toNumber(eventData?.discountPercentage);
  const totalMembers = eventData?.team ? 1 + members.length : 1;

  return (
    <RegisterFormContext.Provider
      value={{
        eventData,
        teamName,
        members,
        submissionLabels,
        submissionLinks,
        transactionNum,
        transactionId,
        coupon,
        discountPercentage,
        payableAmount,
        costStructure,
        totalMembers,
        minAdditionalMembers,
        maxAdditionalMembers,
        setTeamName,
        addMember,
        removeMember,
        setMemberAt,
        setSubmissionLinkAt,
        setTransactionNum,
        setTransactionId,
        setCoupon,
        setPayableAmount,
        setCostStructure,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export const useRegisterFormContext = () => {
  const ctx = useContext(RegisterFormContext);
  if (!ctx) {
    throw new Error(
      "useRegisterFormContext must be used inside RegisterFormProvider",
    );
  }
  return ctx;
};
