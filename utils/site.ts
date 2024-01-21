import {
  getSiteTemplatesWithServerToken,
  PSIResult,
  Sites,
} from "deco-sites/admin/clients/supabase/sites.ts";
import { getProductionDomain } from "deco-sites/admin/clients/supabase/utils.ts";
import { Template } from "deco-sites/admin/components/dash/CreateSiteForm.tsx";

export const mapSiteToTemplate = (
  { domains, pagespeed, name, ...rest }: Partial<Sites> & Pick<Sites, "name">,
) => ({
  ...rest,
  name: name,
  desktopScore: pagespeed
    ? (pagespeed as PSIResult).lighthouseResult.categories.performance
      .desktopScore * 100
    : null,
  mobileScore: pagespeed
    ? (pagespeed as PSIResult).lighthouseResult.categories.performance
      .mobileScore * 100
    : null,
  domain: getProductionDomain({ name, domains }),
} as Template);

export const loadTemplates = async () => {
  const templates = await getSiteTemplatesWithServerToken();

  return templates.map(mapSiteToTemplate);
};
