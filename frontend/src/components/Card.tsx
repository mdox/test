import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Driver } from "../lib/types";

export type CardProps = Driver & {
  index: number;
  onOvertakeRequested(id: number): void;
  onTakePlace(from: number, to: number): void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export function Card(props: CardProps) {
  // Refs
  const refCardFrame = useRef<HTMLDivElement>(null);

  // DnD
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // hover(item: DragItem, mintor) {},
    drop(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = props.index;

      props.onTakePlace(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => ({
      id: props.id,
      index: props.index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Events
  function onOvertakeRequested() {
    props.onOvertakeRequested(props.id);
  }

  // Take Effects
  drag(drop(refCardFrame));

  // Renders
  return (
    <div
      ref={refCardFrame}
      className="flex gap-2 p-2 bg-orange-200 rounded"
      data-handler-id={handlerId}
    >
      <div className="relative max-w-[136px] max-h-[136px]">
        <img
          src={props.imgUrl}
          alt={props.firstname}
          className="block object-cover max-w-full max-h-full bg-yellow-500 rounded shadow bg-opacity-10"
        />
        <span className="absolute right-2 bottom-2 min-w-[2.75rem] min-h-[2.75rem] flex items-center justify-center text-sm p-3 rounded-full bg-stone-100">
          #{props.place! + 1}
        </span>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-start justify-between">
          <span className="flex items-center flex-grow gap-2">
            <img
              src={`https://countryflagsapi.com/svg/${props.country.toLowerCase()}`}
              alt={props.country}
              className="max-w-[2rem]"
            />
            <h2>
              {props.firstname} {props.lastname}
            </h2>
          </span>
          <span className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 bg-green-300 disabled:opacity-50"
              disabled={props.place === 0}
              onClick={onOvertakeRequested}
            >
              Overtake
            </button>
            <button
              type="button"
              className="px-3 py-2 cursor-move bg-stone-300 disabled:opacity-50"
            >
              Drag
            </button>
          </span>
        </div>
        <p className="italic">{props.team}</p>
        <p className="self-end">{props.code}</p>
      </div>
    </div>
  );
}
