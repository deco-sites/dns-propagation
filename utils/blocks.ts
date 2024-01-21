import {
  RETURN_LABEL_QS,
  RETURN_URL_QS,
} from "deco-sites/admin/components/pages/block-edit/useBlockActions.ts";
import { isPlay } from "deco-sites/admin/sdk/environment.tsx";
import {
  PATH_QS,
  PATH_TEMPLATE_QS,
} from "../components/pages/block-edit/state.tsx";

export const TYPE_QS = "type";
export const DECO_PLAY_PREFIX = "play";

export const getBlockHref = <T extends { id: string; revision?: string }>(
  block: T,
  {
    site,
    returnUrl,
    returnLabel,
    prefix = "/admin/sites",
    ref,
    type,
    path,
    pathTemplate,
  }: {
    prefix?: string;
    site: string;
    /**
     * @deprecated drop this after migrate to new admin
     */
    returnUrl?: string;
    returnLabel?: string;
    ref?: string;
    type?: string;
    /**
     * @description used to fullfil the editor address bar path
     */
    path?: string;
    pathTemplate?: string;
  },
) => {
  const search = new URLSearchParams();

  if (returnLabel) {
    search.set(RETURN_LABEL_QS, returnLabel);
  }

  if (returnUrl) {
    search.set(RETURN_URL_QS, returnUrl);
  }

  if (block.revision) {
    search.set("revisionId", block.revision);
  }

  if (ref) {
    search.set("ref", ref);
  }
  if (type) {
    search.set(TYPE_QS, type);
  }

  if (path) {
    search.set(PATH_QS, path);
    search.set(PATH_TEMPLATE_QS, path);
  }

  if (pathTemplate) {
    search.set(PATH_TEMPLATE_QS, pathTemplate);
  }

  if (isPlay) {
    return `/${DECO_PLAY_PREFIX}/blocks/${
      encodeURIComponent(block.id)
    }?${search.toString()}`;
  }

  return `${prefix}/${site}/blocks/${
    encodeURIComponent(block.id)
  }?${search.toString()}`;
};

export const getLocationHref = (siteName: string, location?: string) => {
  return isPlay
    ? `/${DECO_PLAY_PREFIX}/${location}`
    : `/sites/${siteName}/${location}`;
};
