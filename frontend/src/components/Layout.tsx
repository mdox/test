import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  return <div className="mx-auto max-w-screen-md">{props.children}</div>;
}
