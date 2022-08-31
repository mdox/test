import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Card } from "../components/Card";
import { DriversDatabase } from "../lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function DriversPage() {
  // useSWR
  const { data, mutate } = useSWR<DriversDatabase>("/api/drivers", fetcher);

  // Memos
  const sortedDriversDatabase: DriversDatabase = useMemo(() => {
    if (!data) return [];
    return data.sort((a, b) => (a.place! < b.place! ? -1 : 1));
  }, [data]);

  // Events
  async function onTakePlace(from: number, to: number) {
    const placeTakerId = sortedDriversDatabase[from].id;
    const placeHolderId = sortedDriversDatabase[to].id;

    mutate(
      await fetch(`/api/drivers/${placeTakerId}/takeplace/${placeHolderId}`, {
        method: "POST",
      }).then((res) => res.json())
    );
  }

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

      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col gap-2 pb-2">
          {sortedDriversDatabase.map((item, index) => (
            <Card
              key={item.id}
              {...item}
              index={index}
              onOvertakeRequested={onOvertakeRequested}
              onTakePlace={onTakePlace}
            />
          ))}
        </div>
      </DndProvider>
    </>
  );
}
