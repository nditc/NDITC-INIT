import Input from "@/components/ui/form/Input";
import Separator from "@/components/ui/Separator";
import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRegisterFormContext } from "./RegisterFormContext";

const TeamInput = ({ data }: { data: any }) => {
  const {
    members,
    teamName,
    maxAdditionalMembers,
    setTeamName,
    addMember: addMemberToState,
    removeMember: removeMemberFromState,
    setMemberAt,
  } = useRegisterFormContext();

  const handleAddMember = () => {
    if (members.length >= maxAdditionalMembers) {
      toast.warn(`Max ${data.maxMember} Members`, {});
      return;
    }

    addMemberToState();
  };

  const handleRemoveMember = (i: number) => {
    removeMemberFromState(i);
  };

  return (
    <>
      {data.team ? (
        <>
          <Input
            name="CteamName"
            label={"Team Name"}
            required
            value={teamName}
            onChange={(e) => setTeamName(e.currentTarget.value)}
          />
          <div className="my-2 flex items-center justify-center gap-4 text-lg">
            <span className="text-primary-150">
              Additional Members ({data.maxMember - 1} max.)
            </span>
            <Separator />
            <button
              onClick={handleAddMember}
              type="button"
              className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm transition hover:bg-secondary-600 md:text-lg"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary-400">
                <BiPlus />
              </span>
              Add Member
            </button>
          </div>

          {members.length >= 1 ? (
            <div className="flex flex-col gap-4">
              {members.map((member, i) => {
                return (
                  <div key={`member-${i}`} className="relative">
                    <Input
                      type="text"
                      name={`members_${i}`}
                      label={"Teammate " + (i + 1)}
                      value={member}
                      onChange={(e) => setMemberAt(i, e.currentTarget.value)}
                    />
                    <button
                      onClick={() => handleRemoveMember(i)}
                      type="button"
                      className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 px-2 py-3 text-lg transition"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 hover:bg-red-400">
                        <BiMinus />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-secondary-500 px-2 py-8 text-center text-white/80 opacity-85">
              <span>
                <FaUserSlash className="mb-1 inline" /> Additional Members not
                added yet.
              </span>
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default TeamInput;
