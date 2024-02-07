import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "access-point"
  | "access-point-off"
  | "alert-circle"
  | "app-window"
  | "apps"
  | "archive"
  | "arrow-autofit-up"
  | "arrow-back-up"
  | "arrow-back-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-left-right"
  | "arrow-right"
  | "arrows-shuffle"
  | "arrows-sort"
  | "arrow-split"
  | "arrow-up"
  | "arrow-up-circle"
  | "bell"
  | "book"
  | "braces"
  | "brand-discord"
  | "brand-github"
  | "brand-google"
  | "building-store"
  | "bulb"
  | "calendar-event"
  | "campaign"
  | "chart"
  | "chart-bar"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "chevron-up"
  | "circle-1"
  | "circle-2"
  | "circle-3"
  | "circle-4"
  | "circle-5"
  | "circle-6"
  | "circle-check"
  | "circle-dot"
  | "clock"
  | "cloud-storm"
  | "clover"
  | "code"
  | "copy"
  | "cookie"
  | "currency-dollar"
  | "current-location"
  | "deco-glow"
  | "deco-minimal"
  | "deco-play"
  | "device-desktop"
  | "device-mobile"
  | "device-tablet"
  | "dots"
  | "edit"
  | "experiment"
  | "external-link"
  | "eye"
  | "eye-off"
  | "file"
  | "file-unknown"
  | "files"
  | "files"
  | "folder"
  | "flag"
  | "flask"
  | "git-merge"
  | "grip-vertical"
  | "hand-click"
  | "history"
  | "home"
  | "home-move"
  | "info-circle"
  | "language"
  | "layout-grid"
  | "layout-sidebar-right"
  | "link"
  | "list-tree"
  | "loader-2"
  | "lock"
  | "logout"
  | "mail"
  | "map-2"
  | "message"
  | "microphone"
  | "minus"
  | "moon"
  | "movie"
  | "network"
  | "newLink"
  | "news"
  | "package"
  | "packages"
  | "pencil"
  | "performance"
  | "photo"
  | "play"
  | "playstation-circle"
  | "plus"
  | "publishNow"
  | "question-mark"
  | "rectangle"
  | "rectangle-vertical"
  | "refresh"
  | "rocket"
  | "search"
  | "server"
  | "settings"
  | "sort-up"
  | "sort-up-selected"
  | "sparkle"
  | "speakerphone"
  | "square"
  | "sun"
  | "switch"
  | "tag"
  | "tool"
  | "trash"
  | "unlink"
  | "unsplash"
  | "user"
  | "user-check"
  | "user-plus"
  | "users"
  | "viewfinder"
  | "wand"
  | "world"
  | "world-download"
  | "world-www"
  | "x"
  | "sort-up"
  | "sort-up-selected"
  | "link"
  | "list"
  | "list-tree"
  | "publishNow"
  | "experiment"
  | "campaign"
  | "world-upload"
  | "x"
  | "x-circle"
  | "unsplash"
  | "square"
  | "rectangle"
  | "rectangle-vertical"
  | "bars-3"
  | "redo"
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use
        href={asset(
          `/sprites.svg?__frsh_c=00f3912fc57a0efffbc22e5841110f0fd70ee9a3#${id}`,
        )}
      />
    </svg>
  );
}

export default Icon;
