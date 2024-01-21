// deno-lint-ignore-file no-explicit-any
import Popper from "./Popper.tsx";
import {
  autoUpdate,
  flip,
  FloatingList as FL,
  FloatingNode as FN,
  FloatingPortal as FP,
  FloatingTree as FT,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  ComponentChild,
  ComponentProps,
  ComponentType,
  JSX,
  VNode,
} from "preact";
import { Children, forwardRef, isValidElement } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import Icon from "./Icon.tsx";
import Text from "./Text.tsx";
import { useState } from "preact/hooks";

type Child = { children: ComponentChild };
type FixPreactType<T extends ComponentType<any>> = ComponentType<
  Omit<ComponentProps<T>, "children"> & Child
>;
const FloatingNode = FN as FixPreactType<typeof FN>;
const FloatingTree = FT as FixPreactType<typeof FT>;
const FloatingPortal = FP as FixPreactType<typeof FP>;
const FloatingList = FL as FixPreactType<typeof FL>;

const MENU_ITEM = "MenuItem";
const MENU = "Menu";

const disabled =
  "disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-500 disabled:border-base-400";
const variants = {
  default:
    `focus:outline-none text-base-700 focus:bg-base-100 hover:bg-base-100 ${disabled}`,
  special:
    `bg-positive-800 text-positive-100 border-positive-100 hover:bg-positive-900 hover:text-positive-200 hover:border-positive-100 ${disabled}`,
  critical:
    `focus:outline-none text-critical-900 focus:bg-critical-100 hover:bg-critical-100 ${disabled}`,
  icon:
    `text-base-700 hover:bg-base-100 hover:text-base-700 focus:bg-base-100 focus:outline-2 focus:outline-focus-default focus:text-base-700 ${disabled}`,
  "icon-quiet":
    `text-base-700 hover:text-base-700 focus:outline-2 focus:outline-focus-default focus:text-base-700 ${disabled}`,
};

interface MenuItemProps {
  label: any;
  as?: "button" | "a";
  variant?: Exclude<keyof typeof variants, "icon">;
  prevIcon?: any;
  nextIcon?: any;
  class?: string;
}

export const MenuItem = forwardRef<
  HTMLButtonElement,
  MenuItemProps & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "label" | "as">
>((
  {
    label,
    as = "button",
    variant = "default",
    prevIcon,
    nextIcon,
    selected,
    ...props
  },
  ref,
) => {
  const Comp = as as any;

  return (
    <Comp
      type="button"
      ref={ref}
      {...props}
      class={`flex items-center gap-2 p-2 rounded ${variants[variant]} ${
        selected ? "text-decorative-one-900" : ""
      } ${props.class ?? ""}`}
      role="menuitem"
    >
      {prevIcon && cloneElement(prevIcon, { size: 20 })}
      <Text
        tone={selected
          ? undefined
          : props.disabled
          ? "base-500"
          : (variant === "icon-quiet" ||
              variant === "default")
          ? "base-700"
          : "critical-900"}
        class={`flex-grow whitespace-nowrap ${
          selected ? "!text-decorative-one-900" : ""
        }`}
      >
        {label}
      </Text>
      {nextIcon && cloneElement(nextIcon, { size: 20 })}
    </Comp>
  );
});
MenuItem.displayName = MENU_ITEM;

interface Props {
  children?: VNode<{ label: string; onClick?: any }> | (
    | VNode<
      { label: string; onClick?: any }
    >
    | undefined
    | null
  )[];
  label: any;
  nested?: boolean;
  placement?: Placement;
  variant?: keyof typeof variants;
  rootId?: string;
  prevIcon?: any;
  nextIcon?: any;
  popperStyle?: any;
  loading?: boolean;
  loadingContent?: JSX.Element;
}

// https://floating-ui.com/docs/react-examples
// Reference: https://codesandbox.io/s/admiring-lamport-5wt3yg?file=/src/DropdownMenu.tsx
const MenuComponent = forwardRef(
  function MenuComponent(
    {
      children,
      label,
      placement,
      variant = "default",
      prevIcon,
      nextIcon,
      class: _class,
      rootId,
      popperStyle,
      ...props
    }:
      & Props
      & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "label" | "as" | "loading">,
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();

    const isNested = parentId != null;

    const { floatingStyles, refs, context } = useFloating({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? "right-start" : "bottom-start",
      middleware: [
        offset({
          mainAxis: isNested ? 0 : 4,
          alignmentAxis: isNested ? -4 : 0,
        }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(context, {
      event: "mousedown",
      toggle: !isNested,
      ignoreMouse: isNested,
    });
    const role = useRole(context, { role: "menu" });
    const dismiss = useDismiss(context, { bubbles: true });
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
    });

    const {
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    } = useInteractions([hover, click, role, dismiss, listNavigation]);

    useEffect(() => {
      if (!tree) return;

      function handleTreeClick() {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

      tree.events.on("click", handleTreeClick);
      tree.events.on("menuopen", onSubMenuOpen);

      return () => {
        tree.events.off("click", handleTreeClick);
        tree.events.off("menuopen", onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit("menuopen", { parentId, nodeId });
      }
    }, [tree, isOpen, nodeId, parentId]);

    const referenceRef = useMergeRefs([refs.setReference, ref]);

    // TODO: Drop this when useFloatingNodeId is different from parent. This bug happens because this hook uses useId from preact that's buggy.
    if (parentId === nodeId) return undefined;

    return (
      <FloatingNode id={nodeId}>
        <button
          ref={referenceRef}
          data-open={isOpen ? "" : undefined}
          class={`menu ${isNested ? "gap-2 p-2" : ""} ${variants[variant]} ${
            _class ?? ""
          }`}
          {...(getReferenceProps as (
            p: Omit<JSX.HTMLAttributes<HTMLButtonElement>, "label" | "as">,
          ) => any)({
            ...props as any,
            onClick(event) {
              event.preventDefault();
              props.onClick?.(event);
            },
            ...(isNested && {
              // Indicates this is a nested <Menu /> acting as a <MenuItem />.
              role: "menuitem",
            }),
          })}
          style={props.style}
        >
          {props.loading ? props.loadingContent : (
            <>
              {prevIcon && cloneElement(prevIcon, { size: 20 })}
              {typeof label === "string"
                ? (
                  <Text
                    variant="body-regular"
                    tone={props.disabled
                      ? "base-500"
                      : (variant === "icon-quiet" ||
                          variant === "default")
                      ? "base-700"
                      : "base-000"}
                    class="flex-grow"
                  >
                    {label}
                  </Text>
                )
                : label}
              {nextIcon && cloneElement(nextIcon, { size: 20 })}
              {isNested && !nextIcon && <Icon id="alert-circle" size={16} />}
            </>
          )}
        </button>
        <FloatingList elementsRef={elementsRef}>
          <FloatingPortal id={rootId}>
            <Popper
              open={isOpen}
              context={context}
              style={{
                ...floatingStyles,
                zIndex: 999999999999,
                width: "max-width",
                ...popperStyle,
              }}
              modal={false}
              initialFocus={isNested ? -1 : 0}
              returnFocus={!isNested}
              menuRef={refs.setFloating}
              {...getFloatingProps()}
              class={"bg-base-000 gap-0"}
            >
              {Children.map(
                children as VNode<any>[],
                (child: VNode<any>, index) => {
                  if (!child) return child;

                  const menuEl =
                    (child?.type as { displayName?: string }).displayName ===
                      MENU_ITEM ||
                    (child?.type as { displayName?: string }).displayName ===
                      MENU;

                  if (!menuEl) return child;

                  return child && isValidElement(child) &&
                    cloneElement(
                      child,
                      getItemProps({
                        tabIndex: activeIndex === index ? 0 : -1,
                        ref(node: HTMLButtonElement) {
                          elementsRef.current[index] = node;
                        },
                        async onClick(event) {
                          const promise = child.props.onClick?.(event);
                          if (event.defaultPrevented) {
                            await promise;
                            return;
                          }
                          tree?.events.emit("click");
                        },
                        // Allow focus synchronization if the cursor did not move.
                        onMouseEnter() {
                          if (isOpen) {
                            setActiveIndex(index);
                          }
                        },
                      }),
                    );
                },
              )}
            </Popper>
          </FloatingPortal>
        </FloatingList>
      </FloatingNode>
    );
  },
);

export const Menu = forwardRef(
  function Menu(
    props:
      & Props
      & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "label" | "as" | "loading">,
    ref,
  ) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuComponent {...props} ref={ref} />
        </FloatingTree>
      );
    }

    return <MenuComponent {...props} ref={ref} />;
  },
);
Menu.displayName = MENU;
