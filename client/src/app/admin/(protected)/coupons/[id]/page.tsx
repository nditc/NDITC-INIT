"use client";

import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";
import Loading from "@/components/ui/LoadingWhite";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

type EventRow = {
  id: number;
  name: string;
  value: string;
};

const CouponEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [eventId, setEventId] = useState<number | null>(null);
  const [flatDiscount, setFlatDiscount] = useState("0");
  const [status, setStatus] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);

  const [events, eventsLoading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_EVENTS_DATA, {
          cache: "no-store",
          credentials: "include",
        });
      },
      onSuccess: (result) => {
        if (!isNew) return;
        if (Array.isArray(result) && result.length > 0) {
          setEventId(Number(result[0].id));
        }
      },
    },
    [isNew],
  );

  const [, couponLoading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.SINGLE_COUPON + id, {
          credentials: "include",
          cache: "no-store",
        });
      },
      condition: !isNew,
      onSuccess: (result) => {
        setName(result?.name || "");
        setCode(result?.code || "");
        setEventId(result?.eventId ? Number(result.eventId) : null);
        setFlatDiscount(String(result?.flatDiscount ?? 0));
        setStatus(Boolean(result?.status));
      },
    },
    [id, isNew],
  );

  const eventOptions = useMemo(() => {
    if (!Array.isArray(events)) return { labels: [], values: [] as number[] };

    const labels = (events as EventRow[]).map(
      (event) => `${event.name} (${event.value})`,
    );
    const values = (events as EventRow[]).map((event) => Number(event.id));

    return { labels, values };
  }, [events]);

  const selectedEventId =
    eventId ?? (eventOptions.values.length > 0 ? eventOptions.values[0] : null);

  const submit = async () => {
    if (!selectedEventId || !name.trim() || !code.trim()) {
      throw new Error("Event, name and code are required");
    }

    const payload = {
      eventId: selectedEventId,
      name: name.trim(),
      code: code.trim(),
      flatDiscount: Number(flatDiscount),
      status,
    };

    setSubmitting(true);

    try {
      if (isNew) {
        await fetchJSON(
          reqs.ADD_COUPON,
          {
            method: "POST",
            credentials: "include",
          },
          payload,
        );
      } else {
        await fetchJSON(
          reqs.EDIT_COUPON + id,
          {
            method: "PATCH",
            credentials: "include",
          },
          payload,
        );
      }

      router.push("/admin/coupons");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-screen bg-primary-900 relative w-full overflow-hidden text-white">
      <section className="my-32 w-full antialiased">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => router.back()}
              className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
            >
              ← Back
            </button>
            <h1 className="mt-3 bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-5xl text-transparent md:text-6xl">
              {isNew ? "ADD" : "EDIT"} COUPON
            </h1>
          </div>
        </div>

        {eventsLoading || couponLoading ? (
          <div className="grid h-[45vh] place-items-center">
            <Loading />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name="name"
                label="Coupon Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />

              <Input
                name="code"
                label="Coupon Code"
                value={code}
                onChange={(e) => setCode(e.currentTarget.value.toUpperCase())}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {eventOptions.values.length > 0 ? (
                <Select
                  name="eventId"
                  label="Event"
                  values={eventOptions.values}
                  labels={eventOptions.labels}
                  defaultValue={selectedEventId || undefined}
                  onChange={(value) => setEventId(Number(value))}
                />
              ) : null}

              <Input
                name="flatDiscount"
                label="Flat Discount (BDT)"
                type="number"
                min={0}
                value={flatDiscount}
                onChange={(e) => setFlatDiscount(e.currentTarget.value)}
                required
              />

              <Select
                name="status"
                label="Status"
                values={[true, false]}
                labels={["Active", "Inactive"]}
                defaultValue={status}
                onChange={(value) => setStatus(Boolean(value))}
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  toast.promise(submit(), {
                    pending: isNew
                      ? "Creating coupon..."
                      : "Updating coupon...",
                    success: isNew ? "Coupon created" : "Coupon updated",
                    error: "Failed to save coupon",
                  });
                }}
                className="rounded-full bg-primary-450 px-8 py-3 font-semibold text-white hover:bg-primary-350 disabled:opacity-70"
              >
                {submitting
                  ? "Saving..."
                  : isNew
                    ? "Create Coupon"
                    : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CouponEditPage;
