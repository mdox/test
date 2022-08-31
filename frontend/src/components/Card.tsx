import { Driver } from "../lib/types";

export type CardProps = Driver & {
  onOvertakeRequested(id: number): void;
};

export function Card(props: CardProps) {
  // Events
  function onOvertakeRequested() {
    props.onOvertakeRequested(props.id);
  }

  // Renders
  return (
    <div className="flex gap-2 p-2 bg-orange-200 rounded">
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
          <h2>
            {props.firstname} {props.lastname}
          </h2>
          <button
            type="button"
            className="px-3 py-2 bg-green-300 disabled:opacity-50"
            disabled={props.place === 0}
            onClick={onOvertakeRequested}
          >
            Overtake
          </button>
        </div>
        <p className="italic">{props.team}</p>
        <p className="self-end">{props.code}</p>
      </div>
    </div>
  );
}
