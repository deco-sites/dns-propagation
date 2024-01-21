import { FloatingFocusManager } from "@floating-ui/react";
import type { ComponentChildren, ComponentProps, JSX, Ref } from "preact";

export interface Props extends
  Omit<
    ComponentProps<typeof FloatingFocusManager>,
    "children"
  >,
  Record<string, unknown> {
  open: boolean;
  menuRef: Ref<HTMLDivElement>;
  children: ComponentChildren;
  style: JSX.CSSProperties;
  isItemSelected?: boolean;
}

export default function Popper(
  {
    context,
    modal,
    menuRef,
    open,
    children,
    isItemSelected,
    initialFocus,
    returnFocus,
    class: _class,
    ...floatingProps
  }: Props,
) {
  return (
    <>
      {open && (
        <FloatingFocusManager
          context={context}
          modal={modal}
          initialFocus={initialFocus}
          returnFocus={returnFocus}
        >
          <div
            ref={menuRef}
            class={`overflow-y-auto outline-none rounded-lg bg-base-000 p-1 border border-base-300 shadow-s-low-light dark:shadow-s-low-dark flex flex-col gap-0 ${
              isItemSelected ? "!relative !pl-2.5" : ""
            } ${_class ?? ""}`}
            {...floatingProps}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
