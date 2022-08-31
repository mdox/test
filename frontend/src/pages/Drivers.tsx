import { Link } from "react-router-dom";
import useSWR from "swr";
import { Card } from "../components/Card";
import { DriversDatabase } from "../lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function DriversPage() {
  // States
  const { data, mutate } = useSWR<DriversDatabase>("/api/drivers", fetcher);

  // Events
  async function onOvertakeRequested(id: number) {
    mutate(
      await fetch(`/api/drivers/${id}/overtake`, {
        method: "POST",
      }).then((res) => res.json())
    );
  }

  // Renders
  return (
    <>
      <p>
        <Link to="/">Back to Home please.</Link>
      </p>

      <div className="flex flex-col gap-2 pb-2">
        {data
          ? data.map((item) => (
              <Card
                key={item.id}
                {...item}
                onOvertakeRequested={onOvertakeRequested}
              />
            ))
          : null}
      </div>
    </>
  );
}
