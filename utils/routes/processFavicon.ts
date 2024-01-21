type Data = {
  favicon?: string;
};

export const processFavicon = async (
  data: Data,
  domain: string,
) => {
  const googleUserContentUrl =
    "https://s2.googleusercontent.com/s2/favicons?domain=";

  const headers = await fetch(`${googleUserContentUrl}${domain}`).then(
    (res) => res.headers,
  );

  const favicon = headers.get("content-location");

  if (favicon) {
    data.favicon = favicon ?? undefined;
  }
};
