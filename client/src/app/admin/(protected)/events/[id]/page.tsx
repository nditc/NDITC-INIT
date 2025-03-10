"use client";

import React, { useContext, useEffect, useReducer, useState } from "react";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import ImageContext from "@/context/StateContext";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../../../color.config";
import "@/components/Admin/Dashboard/Dashboard.css";
import { useRouter } from "next/navigation";
import { getAllCategories, getEvent } from "@/api/events";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/ui/form/Select";
import {
  actions,
  conditionState,
  conditionStateType,
  conditionStateVal,
} from "@/types/conditionsEvents";
import Markdown from "react-markdown";
import MdSection from "@/components/ui/MdSection";
import useForm from "@/hooks/useForm";
import { camelCase } from "change-case";
import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Loading from "@/components/ui/LoadingWhite";
import { formatDate } from "@/utils/Date";
import SwitchCheckbox from "@/components/ui/form/SwitchCheckbox";

const EventEditForm = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === "new";

  const router = useRouter();
  const [, dispatch] = useContext(ImageContext) || [, () => {}];
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  const [conditions, setConditions] = useReducer(
    (prevState: any, action: actions) => {
      switch (action.type) {
        case "CLEAR":
          return conditionState;
        case "SET":
          if (action.field) {
            return { ...prevState, [action.field]: action.value };
          }
        case "ALL":
          return action.value;
        case "TOGGLE":
          if (action.field && action.field in prevState) {
            return {
              ...prevState,
              [action.field]: !prevState[action.field],
            };
          }
      }
      return prevState;
    },
    conditionState,
  );

  const [form, formLoading] = useForm({
    formDataProcess: (formData) => {
      formData.append("value", camelCase(formData.get("name") as string));

      // add all conditions in formData
      conditionStateVal.forEach((item, i) => {
        formData.set(item, formData.get(item) === "on" ? "true" : "false");
      });

      // fixing submission and prize as they are not boolean
      formData.set(
        "submission",
        formData.get("submission") === "true"
          ? JSON.stringify({
              type: "link",
              name: formData.get("links"),
              size: "",
            })
          : "{}",
      );

      formData.set(
        "prize",
        formData.get("prize") === "true"
          ? JSON.stringify({
              "1st": formData.get("p1"),
              "2nd": formData.get("p2"),
              "3rd": formData.get("p3"),
            })
          : "{}",
      );

      return formData;
    },
    handler: async (data, formData) => {
      if (formData) {
        if (isNew) {
          await fetchJSON(
            reqs.ADD_EVENT,
            {
              method: "POST",
              credentials: "include",
            },
            formData,
            true,
          );
        } else {
          if ((formData.get("event") as File)?.name !== "") {
            await fetchJSON(
              reqs.EDIT_EVENT_IMG + data?.id,
              {
                method: "PATCH",
                credentials: "include",
              },
              formData,
              true,
            );
          }
          await fetchJSON(
            reqs.EDIT_EVENT + data?.id,
            {
              method: "PATCH",
              credentials: "include",
            },
            data,
          );
        }
      }
    },
    successMsg: "Event Updated!",
    onSuccess() {
      setConditions({ type: "CLEAR" });
      setCurrentPhoto(null);
      router.back();
    },
    formData: true,
  });

  const [result, loadingEvent, errorEvent] = useFetch(
    {
      fn: getEvent,
      params: [params.id],
      condition: !isNew,
    },
    [params.id],
  );

  const [category, loadingCat, errorCat] = useFetch(
    {
      fn: getAllCategories,
      params: [params.id],
    },
    [],
  );

  const dV = (key: string) => {
    if (result) {
      return !isNew ? result[key] : "";
    }
  };
  useEffect(() => {
    if (result && !isNew) {
      setCurrentPhoto(reqImgWrapper(result.image));
      setConditions({
        type: "ALL",
        value: {
          team: result.team,
          paid: result.paid,
          gift: result.gift,
          snacks: result.snacks,
          lunch: result.lunch,
          prize: result.prize === "{}" ? false : true,
          submission: result.submission === "{}" ? false : true,
          descPrev: result.description,
          rulesPrev: result.rules,
        },
      });
      console.log(result);
    }
  }, [result, isNew]);
  return (
    <main className="max-w-screen bg-primary-900 relative w-full overflow-x-clip text-white">
      <section className="my-32 flex w-full flex-col gap-6 antialiased">
        <div className="mb-10 flex flex-row items-center justify-between overflow-x-hidden py-5">
          <div className="mx-auto flex w-full flex-col items-center gap-5 md:flex-row">
            <div className="flex flex-1 items-center gap-5">
              <div className="flex flex-col self-stretch">
                <div className="flex flex-col">
                  <div>
                    <button
                      onClick={() => router.back()}
                      className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
                    >
                      ← Back
                    </button>
                  </div>
                  <h1 className="mt-3 bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-7xl text-transparent">
                    {isNew ? "ADD" : "EDIT"} EVENT
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="space-y-6" ref={form}>
            <div className="flex flex-col-reverse items-center gap-4 md:flex-row-reverse lg:gap-10">
              <div className="w-full flex-1 space-y-4 md:space-y-8">
                <Input type="text" name="id" hidden defaultValue={dV("id")} />
                <Input
                  type="text"
                  name="name"
                  label="Name"
                  required
                  defaultValue={dV("name")}
                />

                <div className="flex flex-row gap-4 lg:gap-10">
                  <Input
                    type="date"
                    name="date"
                    divClass="w-full"
                    label="Date"
                    defaultValue={formatDate(dV("date"))}
                    required
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <PhotoUpload
                  name="event"
                  type="IMG"
                  currentPhoto={currentPhoto}
                  setCurrentPhoto={setCurrentPhoto}
                  divClass="h-[275px]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row lg:gap-10">
              <div className="w-full space-y-6">
                <div className="flex flex-col gap-4 md:flex-row lg:gap-10">
                  {Array.isArray(category) && category?.length > 0 ? (
                    <Select
                      divClass=" w-full"
                      name="categoryId"
                      label="Type"
                      labels={category.map((v: any) => {
                        return v.name;
                      })}
                      values={category?.map((v: any) => {
                        return Number(v.id);
                      })}
                      defaultValue={dV("categoryId")}
                    />
                  ) : null}
                  <Select
                    divClass=" w-full"
                    name="type"
                    label="Type"
                    labels={["Online 🌐", "Offline 🏫"]}
                    values={["online", "offline"]}
                    defaultValue={dV("type")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-6">
              {conditionStateVal.map((item, i) => (
                <SwitchCheckbox
                  key={item}
                  name={item}
                  onChange={(e) => {
                    setConditions({
                      type: "SET",
                      value: e.currentTarget.checked,
                      field: item,
                    });
                  }}
                  defaultChecked={dV(item)}
                  checked={conditions[item]}
                  label={item}
                />
              ))}
            </div>
            {conditions?.paid ? (
              <>
                <Input
                  type="number"
                  name="fee"
                  divClass="w-full"
                  label="Price (BDT)"
                  defaultValue={dV("fee")}
                />
              </>
            ) : null}
            {conditions?.team ? (
              <>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center lg:gap-10">
                  <div className="w-1/5">
                    <p className="text-3xl text-white">Team:</p>
                  </div>
                  <div className="flex w-full items-start gap-4 md:w-4/5 md:flex-row md:items-center lg:gap-10">
                    <Input
                      divClass="w-full"
                      type="number"
                      name="maxMember"
                      label="Max Members"
                      min={0}
                      max={10}
                      defaultValue={dV("maxMember")}
                    />
                  </div>
                </div>
              </>
            ) : null}

            {conditions?.submission ? (
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center lg:gap-10">
                <div className="w-1/5">
                  <p className="text-3xl text-white">Submission:</p>
                </div>
                <div className="flex w-full items-start gap-4 md:w-4/5 md:flex-row md:items-center lg:gap-10">
                  <Input
                    divClass="w-full"
                    type="text"
                    name="links"
                    label="Links (add '&&&&' for 2+ fields)"
                    defaultValue={JSON.parse(dV("submission")).name}
                  />
                </div>
              </div>
            ) : null}

            {conditions?.prize ? (
              <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-10">
                <div className="w-1/5">
                  <p className="text-3xl text-white">Prize:</p>
                </div>
                <Input
                  divClass="w-full"
                  type="text"
                  name="p1"
                  label="Prize Champion"
                  defaultValue={JSON.parse(dV("prize"))["1st"]}
                />
                <Input
                  divClass="w-full"
                  type="text"
                  name="p2"
                  label="1st Runner"
                  defaultValue={JSON.parse(dV("prize"))["2nd"]}
                />
                <Input
                  divClass="w-full"
                  type="text"
                  name="p3"
                  label="2nd Runner"
                  defaultValue={JSON.parse(dV("prize"))["3rd"]}
                />
              </div>
            ) : null}
            <div>
              <TextArea
                label="Description"
                name="description"
                rows={4}
                onChange={(e) =>
                  setConditions({
                    type: "SET",
                    field: "descPrev",
                    value: e.currentTarget.value,
                  })
                }
                defaultValue={dV("description")}
                required
              />
              <div className="mt-4 rounded-3xl border border-white/10 bg-secondary-700 p-5">
                <h4 className="Inter font-semibold text-white/50">
                  Description Preview
                </h4>
                <MdSection>{conditions.descPrev}</MdSection>
              </div>
            </div>
            <div>
              <TextArea
                name="rules"
                label="Rules & Regulations"
                rows={4}
                onChange={(e) =>
                  setConditions({
                    type: "SET",
                    field: "rulesPrev",
                    value: e.currentTarget.value,
                  })
                }
                defaultValue={dV("rules")}
                required
              />
              <div className="mt-4 rounded-3xl border border-white/10 bg-secondary-700 p-5">
                <h4 className="Inter font-semibold text-white/50">
                  Rules Preview
                </h4>
                <MdSection>{conditions.rulesPrev}</MdSection>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                disabled={formLoading}
                type="submit"
                className="mx-auto flex items-center gap-1 rounded-full bg-primary-400 px-10 py-2 text-white hover:bg-primary-300 focus:outline-none md:mx-0"
              >
                {formLoading && <Loading scale={0.7} />}
                {isNew ? "Add" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EventEditForm;
