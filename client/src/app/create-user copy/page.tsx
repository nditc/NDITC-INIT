"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Loading from "@/components/ui/LoadingWhite";
import ExtendedColors from "../../../color.config";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roll: number;
  group: number;
  profilePicture: string | null;
}

const UserManagement = () => {
  const fakeUsers: User[] = [
    {
      id: "1",
      name: "Ayesha Khatun",
      email: "ayesha@example.com",
      password: "secret123",
      roll: 101,
      group: 1,
      profilePicture: null,
    },
    {
      id: "2",
      name: "Rakib Hasan",
      email: "rakib@example.com",
      password: "rakib456",
      roll: 102,
      group: 2,
      profilePicture: null,
    },
    {
      id: "3",
      name: "Mim Akter",
      email: "mim@example.com",
      password: "mimpass",
      roll: 103,
      group: 1,
      profilePicture: null,
    },
    {
      id: "4",
      name: "Sajid Rahman",
      email: "sajid@example.com",
      password: "sajid789",
      roll: 104,
      group: 3,
      profilePicture: null,
    },
  ];
  const [users, setUsers] = useState<User[]>(fakeUsers);

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    group: "",
  });

  const { handleSubmit, loading } = useForm({
    handler: async (_, rawFormData) => {
      const file = rawFormData?.get("profilePicture") as File;

      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roll: Number(formData.roll),
        group: Number(formData.group),
        profilePicture: file?.name ? URL.createObjectURL(file) : null,
      };

      setUsers((prev) => [...prev, newUser]);
      setCurrentPhoto(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        roll: "",
        group: "",
      });

      return { success: true };
    },
    formData: true,
    successMsg: "Manager created successfully!",
  });

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-start">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c flex flex-col items-center justify-center gap-20 py-[81px] md:flex-row">
        <div className="w-full max-w-[1000px] flex-1">
          <div className="mt-16 flex w-full items-center justify-center gap-1.5 text-center">
            <AiOutlineUserAdd className="text-primary h-16 w-16 text-primary-150" />
            <div className="flex flex-col items-start justify-start gap-0.5">
              <p className="text-lg font-semibold text-primary-200">
                Admin Panel
              </p>
              <p className="GradText text-5xl">User Management</p>
            </div>
          </div>
          <p className="mb-5 text-center text-white/80">
            Create and manage manager accounts with the required information.
          </p>

          <form
            className="mb-10 grid w-full grid-cols-1 gap-5"
            onSubmit={handleSubmit}
          >
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
              <Input
                label="Full Name"
                name="name"
                id="name"
                type="text"
                divClass="md:col-span-2"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Input
                label="Email"
                name="email"
                id="email"
                type="email"
                divClass="md:col-span-2"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                label="Password"
                name="password"
                id="password"
                type="password"
                divClass="md:col-span-2"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={
                    "btn-prim Bebas inline-flex items-center gap-1 py-2.5 pr-8 text-center text-xl tracking-wide " +
                    (loading ? "pl-6" : "pl-8")
                  }
                >
                  {loading && <Loading scale={0.6} />}
                  Create Manager
                </button>
              </div>
            </div>
          </form>

          <div className="mt-10">
            <p className="mb-5 text-2xl font-semibold text-primary-200">
              Manager Accounts
            </p>

            {users.length === 0 ? (
              <p className="text-center text-white/80">
                No managers created yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-lg border border-primary-500 bg-primary-600 p-4"
                  >
                    <div className="mb-3 flex items-center gap-4">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500">
                          <AiOutlineUserAdd className="text-xl text-primary-200" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-primary-200">{user.email}</p>
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-primary-200">Roll</p>
                        <p className="text-white">{user.roll}</p>
                      </div>
                      <div>
                        <p className="text-primary-200">Group</p>
                        <p className="text-white">{user.group}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                      className="bg-primary-700 w-full rounded border border-primary-500 py-2 text-sm text-primary-200 transition-colors hover:bg-red-700 hover:text-white"
                    >
                      Delete Manager
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
