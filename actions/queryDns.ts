// deno-lint-ignore-file
import { RecordType } from "../components/DnsPropagation.tsx";

interface Props {
  domainName: string;
  recordType: RecordType;
}

export default async function queryDns(
  { domainName, recordType }: Props,
): Promise<any | string | string[] | undefined> {
  try {
    const resp = await Deno.resolveDns(domainName, recordType);
    return resp;
  } catch (_) {
    // This happens when the recordType is not defined yet or resolution server is down, just return undefined and hope for the best.
    return;
  }
}
