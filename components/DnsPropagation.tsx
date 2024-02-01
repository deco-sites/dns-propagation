import Header from "$store/components/ui/SectionHeader.tsx";
import Text from "$store/components/ui/Text.tsx";
import { Menu, MenuItem } from "$store/components/ui/Menu.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Input from "$store/components/ui/Input.tsx";
import Button from "deco-sites/dns-propagation/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export interface Props {
  /**
   * @description Sorce image to be displayed in the header
   */
  srcImage?: string;
  /**
   * @description Sorce text to be displayed in the header
   */
  srcText?: string;
}

type RecordType =
  | "A"
  | "AAAA"
  | "ANAME"
  | "CAA"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "NS"
  | "PTR"
  | "SOA"
  | "SRV"
  | "TXT";

export default function DnsPropagation({
  srcImage,
  srcText,
}: Props) {
  const searchQuery = useSignal<string>("");


  const queryDNS = async (fdqName: string, queryType: RecordType) => {
    const resp = await Deno.resolveDns(fdqName, queryType);
    console.log ("resp: ", resp);
    return resp;
  };

  return (
    <div class="h-[100vh] w-full flex flex-col gap-8 justify-start bg-positive-900">
      <div class="flex flex-row w-full justify-center pt-10">
        <img src={srcImage} alt="image" width="200px" />
      </div>
      <div class="w-full flex flex-row justify-center">
        <Text variant="hero-large">{"DNS propagation checker"}</Text>
      </div>
      <div class="w-full flex flex-row justify-between px-[200px] pt-10 gap-2">
        <Input
          placeholder={"Testando input"}
          value={searchQuery.value}
          onChange={(e) => searchQuery.value = e.currentTarget.value}
          prefix={<Icon id="search" class="w-5 h-5 mr-2 text-base-500" />}
          autoComplete="off"
        />
        <button aria-expanded="true" aria-haspopup="menu" id="P0-2" class="menu  text-base-700 gap-2 border border-base-300" data-open="" aria-controls="P0-1">
          <span class="text-base-700 undefined text-body-regular font-body-regular inline-flex items-center justify-start gap-1  flex-grow">dns-propagation</span>
          <Icon id="chevron-down" class="w-5 h-5 text-base-500" />
        </button>
        <Button 
          onClick={
            async () => {
              await queryDNS(searchQuery.value, "CNAME");
            }
            // async (e) => {
            //   await Runtime.invoke["deco-sites/dns-propagation"].actions
            //   .queryDNS({
            //     domainName: "oi",
            //   });
            // }
          }
          disabled={false}
        >
          {"Check"}
        </Button>
      </div>
    </div>
  );
}
