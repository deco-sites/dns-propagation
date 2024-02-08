// deno-lint-ignore-file
import { RecordType } from "../components/DnsPropagation.tsx";

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
  const CaaRecordToString = (record: any) => {
    return `${record.critical ? "1" : "0"} ${record.tag} ${record.value}`;
  };

  try {
    let resp = await Deno.resolveDns(domainName, recordType);
    if (recordType === "CAA") resp = resp.map(CaaRecordToString);

    return resp.map((record) => {
      return { type: recordType, content: record };
    });
  } catch (_) {
    // This happens when the recordType is not defined yet or resolution server is down, just return undefined and hope for the best.
    return;
  }
}
