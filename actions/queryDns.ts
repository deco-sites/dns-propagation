// deno-lint-ignore-file
import { RecordType } from "../components/DnsPropagation.tsx";

interface Props {
  domainName: string;
  recordType: RecordType;
}

export interface DnsRecord {
  id?: string;
  type?: string;
  name?: string;
  content?: any;
}

interface CaaRecord {
  critical: boolean;
  tag: string;
  value: string;
}

export default async function queryDns(
  { domainName, recordType }: Props,
): Promise<DnsRecord | undefined> {
  try {
    const resp = await Deno.resolveDns(domainName, recordType);
    console.log(domainName, recordType);
    if (recordType === "A" || recordType === "AAAA") {
      return { type: recordType, content: resp };
    }
    if (recordType === "CNAME") {
      return { type: recordType, content: resp[0] };
    }
    if (recordType === "CAA") {
      const CaaRecordToString = (record: any) => {
        return `${record.critical ? "1" : "0"} ${record.tag} ${record.value}`;
      };
      return { type: recordType, content: resp.map(CaaRecordToString) };
    }
    return;
  } catch (_) {
    // This happens when the recordType is not defined yet or resolution server is down, just return undefined and hope for the best.
    return;
  }
}
