"use client";

import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Loading from "@/components/ui/LoadingWhite";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";

type CouponRow = {
  id: number;
  name: string;
  code: string;
  flatDiscount: number;
  status: boolean;
  eventId: number;
  event?: {
    id: number;
    name: string;
    value: string;
  };
};

const CouponsPage = () => {
  const router = useRouter();
  const [refreshTick, setRefreshTick] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  const refreshPage = useCallback(() => {
    setRefreshTick((prev) => prev + 1);
  }, []);

  const [coupons, loading, error] = useFetch(
    {
      fn: async () => {
        const response = await fetchJSON(reqs.ALL_COUPONS, {
          credentials: "include",
          cache: "no-store",
        });
        return response;
      },
    },
    [refreshTick],
  );

  const filteredCoupons = useMemo(() => {
    if (!Array.isArray(coupons)) return [];

    const key = searchKey.trim().toLowerCase();
    if (!key) return coupons;

    return (coupons as CouponRow[]).filter((coupon) => {
      const eventName = coupon?.event?.name || "";
      const eventValue = coupon?.event?.value || "";
      return [coupon.name, coupon.code, eventName, eventValue]
        .join(" ")
        .toLowerCase()
        .includes(key);
    });
  }, [coupons, searchKey]);

  const deleteCoupon = async (id: number) => {
    const ok = window.confirm("Delete this coupon?");
    if (!ok) return;

    await fetchJSON(
      reqs.DELETE_COUPON + id,
      {
        method: "DELETE",
        credentials: "include",
      },
      null,
    );

    refreshPage();
  };

  return (
    <main className="min-h-screen w-full min-w-0 grow-0">
      <section className="mt-32 w-full">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => router.back()}
              className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
            >
              ← Back
            </button>
            <h1 className="title Bebas mt-3 text-4xl md:text-5xl">COUPONS</h1>
          </div>

          <Link
            href="/admin/coupons/new"
            className="mx-auto flex w-auto items-center gap-2 rounded-full bg-primary-400 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-300 md:mx-0 md:px-8 md:py-3 md:text-base"
          >
            Add
            <IoAdd className="box-content rounded-full bg-white p-1 text-lg text-primary-550 md:text-xl" />
          </Link>
        </div>

        <div className="mb-4 flex flex-col items-start gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.currentTarget.value)}
            placeholder="Search by coupon or event"
            className="w-full rounded-full bg-gradient-to-r from-secondary-400/50 to-secondary-600 px-6 py-3 text-white placeholder:text-white/60 focus:outline-none md:w-96"
          />
          <button
            type="button"
            onClick={refreshPage}
            className="cursor-pointer rounded-full bg-secondary-600 px-5 py-2.5 before:bg-secondary-600 hover:bg-secondary-500 sm:px-8"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid h-[45vh] place-items-center">
            <Loading />
          </div>
        ) : error ? (
          <p className="text-red-300">{String(error)}</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-4 py-3">Coupon</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Flat Discount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-white/70"
                    >
                      No coupons found
                    </td>
                  </tr>
                ) : (
                  filteredCoupons.map((coupon: CouponRow) => (
                    <tr key={coupon.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{coupon.name}</td>
                      <td className="px-4 py-3 font-semibold">{coupon.code}</td>
                      <td className="px-4 py-3">
                        {coupon?.event?.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {Number(coupon.flatDiscount || 0)} ৳
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            "rounded-full px-3 py-1 text-xs " +
                            (coupon.status
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300")
                          }
                        >
                          {coupon.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/coupons/${coupon.id}`}
                            className="rounded-full bg-primary-500 px-4 py-1.5 text-xs hover:bg-primary-400"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              toast.promise(deleteCoupon(coupon.id), {
                                pending: "Deleting coupon...",
                                success: "Coupon deleted",
                                error: "Failed to delete coupon",
                              });
                            }}
                            className="rounded-full bg-red-500/70 px-4 py-1.5 text-xs hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default CouponsPage;
