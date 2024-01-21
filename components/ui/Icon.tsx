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
  | "arrow-up"
  | "arrow-up-circle"
  | "arrows-shuffle"
  | "arrows-sort"
  | "bell"
  | "book"
  | "braces"
  | "brand-discord"
  | "brand-github"
  | "brand-google"
  | "building-store"
  | "bulb"
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
  | "circle-check"
  | "circle-dot"
  | "clock"
  | "clover"
  | "code"
  | "copy"
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
  | "file"
  | "file-unknown"
  | "files"
  | "files"
  | "flag"
  | "flask"
  | "git-merge"
  | "grip-vertical"
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
  | "message"
  | "microphone"
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
  | "x"
  | "sort-up"
  | "sort-up-selected"
  | "link"
  | "list"
  | "list-tree"
  | "publishNow"
  | "experiment"
  | "campaign"
  | "arrows-shuffle"
  | "world-upload"
  | "x"
  | "x-circle"
  | "unsplash"
  | "square"
  | "rectangle"
  | "rectangle-vertical"
  | "bars-3";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

const Icon = ({
  id,
  strokeWidth = 2,
  size = 24,
  width,
  height,
  ...otherProps
}: Props) => (
  <svg
    {...otherProps}
    width={width ?? size}
    height={height ?? size}
    strokeWidth={strokeWidth}
  >
    <use href={asset(`/sprites.svg#${id}`)} />
  </svg>
);

export default Icon;
