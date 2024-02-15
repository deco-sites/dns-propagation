// deno-lint-ignore-file
import { RecordType } from "../components/DnsPropagation.tsx";
import { shortcircuit } from "deco/engine/errors.ts";

async function dnsQueryCloudflare(domain: string, type: string): Promise<any> {
  const apiUrl =
    `https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/dns-json",
      },
    });

    if (!response.ok) {
      shortcircuit(
        new Response(
          `Failed to fetch DNS records. Status: ${response.status}`,
          { status: response.status },
        ),
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function getCname(fqdName: string): Promise<any> {
  const response = await dnsQueryCloudflare(fqdName, "CNAME");

  if (!response) return undefined;

  return response.Answer?.filter((data: any) =>
    data.name === fqdName && data.type === 5
  ).map((data: any) => data.data);
}

async function getA(fqdName: string): Promise<any> {
  const response = await dnsQueryCloudflare(fqdName, "A");

  if (!response) return undefined;

  return response.Answer?.filter((data: any) =>
    data.name === fqdName && data.type === 1
  ).map((data: any) => data.data);
}

async function getTxt(fqdName: string): Promise<any> {
  const response = await dnsQueryCloudflare(fqdName, "TXT");

  if (!response) return undefined;

  return response.Answer?.filter((data: any) =>
    data.name === fqdName && data.type === 16
  ).map((data: any) => data.data);
}

async function getAAAA(fqdName: string): Promise<any> {
  const response = await dnsQueryCloudflare(fqdName, "AAAA");

  if (!response) return undefined;

  return response.Answer?.filter((data: any) =>
    data.name === fqdName && data.type === 28
  ).map((data: any) => data.data);
}

async function getCaa(fqdName: string): Promise<CaaRecord[] | undefined> {
  const resp = await dnsQueryCloudflare(fqdName, "CAA");
  if (resp.Answer === undefined) return undefined;

  return resp.Answer?.map((data: any) => {
    const critical = data.data.split(" ")[2] == "00" ? false : true;

    const hexCAA = data.data.split(" ").slice(4)
      .map((hex: any) => String.fromCharCode(parseInt(hex, 16))).join("");

    const tag = hexCAA.startsWith("issuewild")
      ? "issuewild"
      : hexCAA.startsWith("issue")
      ? "issue"
      : "";

    const value = hexCAA.slice(tag.length);

    return {
      critical: critical,
      tag: tag,
      value: value,
    };
  });
}

interface Props {
  domainName: string;
  recordType: RecordType;
}

export interface DnsRecord {
  id?: string;
  type: string;
  name?: string;
  content: any;
}

interface CaaRecord {
  critical: boolean;
  tag: string;
  value: string;
}

export default async function queryDns(
  { domainName, recordType }: Props,
): Promise<DnsRecord[] | undefined> {
  const CaaRecordToString = (record: CaaRecord) => {
    if (!record) return undefined;
    return `${record.critical ? "1" : "0"} ${record.tag} ${record.value}`;
  };

  try {
    let resp = undefined;
    if (recordType === "CAA") {
      resp = await getCaa(domainName);
      resp = resp?.map(CaaRecordToString);
    } else if (recordType === "CNAME") resp = await getCname(domainName);
    else if (recordType === "A") resp = await getA(domainName);
    else if (recordType === "AAAA") resp = await getAAAA(domainName);
    else if (recordType === "TXT") resp = await getTxt(domainName);

    return resp.length == 0 ? undefined : resp.map((record: string) => {
      return { type: recordType, content: record };
    });
  } catch (_) {
    // This happens when the recordType is not defined yet or resolution server is down, just return undefined and hope for the best.
    return;
  }
}
