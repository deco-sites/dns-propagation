// deno-lint-ignore-file
export default async function queryDns(
  domainName: string,
  queryType: string,
): Promise<string | string[] | undefined> {
  console.log("queryDns", domainName, queryType);
  // const resp = await Deno.resolveDns(fdqName, queryType);
  // console.log ("resp: ", resp);
  // return resp;
  return;
}
