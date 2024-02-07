// deno-lint-ignore-file
import Header from "$store/components/ui/SectionHeader.tsx";
// import Text from "$store/components/ui/Text.tsx";
import Button from "deco-sites/dns-propagation/components/ui/Button.tsx";
import TextInput from "deco-sites/dns-propagation/components/daisy/TextInput.tsx";
import Dropdown from "deco-sites/dns-propagation/components/daisy/Dropdown.tsx";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { invoke } from "$store/runtime.ts";
import Icon from "deco-sites/dns-propagation/components/ui/Icon.tsx";

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

export type RecordType =
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

function TextHeroLarge(text: string | undefined) {
  return (
    <span class="text-[#FAFAFA] font-[600] text-[40px] leading-[48px] inline-flex items-center justify-start gap-1">
      {text}
    </span>
  );
}

export default function DnsPropagation({
  srcImage,
  srcText,
}: Props) {
  const searchQuery = useSignal<string>("");
  const queryType = useSignal<RecordType>("A");
  const queryAns = useSignal<any>(undefined);

  const queryDNS = async (fdqName: string, queryType: RecordType) => {
    const resp = await invoke["deco-sites/dns-propagation"].actions
      .queryDns({
        domainName: fdqName,
        recordType: queryType,
      });
    console.log("resp", resp);
    queryAns.value = resp;
  };

  const renderItems = (item: any) => {
    return (
      <li>
        <a
          onClick={() => {
            queryType.value = item.text as RecordType;
          }}
        >
          {item.text}
        </a>
      </li>
    );
  };

  const renderAnswer = (props: any) => {
    return (
      <div class="mx-40 w-full border-t-fuchsia-600 flex flex-col justify-center items-center px-[200px] pt-10 gap-2">
        <h1>Resultado!</h1>
      </div>
    );
  };

  return (
    <div
      class={`h-[100vh] w-full flex flex-col gap-8 justify-start bg-[#0D1717]`}
    >
      <div class="flex flex-row w-full justify-center pt-20">
        <img src={srcImage} alt="image" width="200px" />
      </div>
      <div class="w-full flex flex-row justify-center">
        {TextHeroLarge(srcText)}
      </div>
      <div class="w-full flex flex-row justify-center items-center px-[200px] pt-6 gap-2">
        <TextInput
          placeholder="Enter a valid URL"
          border={true}
          ghost={false}
          TopRightLabel=""
          bottomLeftLabel=""
          bottomRightLabel=""
          textValue={searchQuery}
          prefix={<Icon id="search" size={20} strokeWidth="2" />}
          class="!bg-transparent text-[#FAFAFA] border-[#727777] focus-within:border-[#AFB6B6]"
        />
        <Dropdown
          label={`Record Type: ${queryType.value}`}
          renderItem={renderItems}
          items={[
            { text: "A" },
            { text: "AAAA" },
            { text: "ANAME" },
            { text: "CAA" },
            { text: "CNAME" },
            { text: "MX" },
            { text: "NAPTR" },
            { text: "NS" },
            { text: "PTR" },
            { text: "SOA" },
            { text: "SRV" },
            { text: "TXT" },
          ]}
          classe="!bg-[#59DA99] !text-[#161616]"
          prefix={<Icon id="settings" size={20} strokeWidth="2" />}
          sufix={<Icon id="chevron-down" size={20} strokeWidth="2" />}
        />
        <Button
          class="bg-[#59DA99] text-[#161616] hover:bg-[#50c48a]"
          onClick={async () => {
            console.log("searchQuery", searchQuery.value);
            await queryDNS(searchQuery.value, queryType.value);
          }}
          disabled={false}
        >
          {"Check"}
        </Button>
      </div>
      {queryAns.value ? (renderAnswer(queryAns.value)) : <></>}
    </div>
  );
}
