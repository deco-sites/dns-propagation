import Header from "$store/components/ui/SectionHeader.tsx";
import Text from "$store/components/ui/Text.tsx";
import { Menu, MenuItem } from "$store/components/ui/Menu.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Input from "$store/components/ui/Input.tsx";

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

export default function InstagramPosts({
  srcImage,
  srcText,
}: Props) {
  console.log(srcImage, srcText);
  const searchQuery = {
    value: "",
  };
  return (
    <div class="h-[100vh] w-full flex flex-col gap-4 justify-start bg-positive-900">
      <div class="flex flex-row w-full justify-center pt-10">
        <img src={srcImage} alt="image" width="200px" />
      </div>
      <div class="w-full flex flex-row justify-center">
        <Text variant="hero-large">{"DNS propagation checker"}</Text>
      </div>
      <div class="w-full flex flex-row justify-center">
        <Input
          placeholder={"Testando input"}
          value={searchQuery.value}
          onChange={(e) => searchQuery.value = e.currentTarget.value}
          prefix={<Icon id="search" class="w-5 h-5 mr-2 text-base-500" />}
          autoComplete="off"
        />
        <>{"botao"}</>
        {
          /* <Menu
          label={
            <Icon id="Star" size={16} />}
          placement="bottom-end"
          variant="icon"
        >
          <MenuItem
            label="Delete"
            prevIcon={<Icon id="Star" />}
            variant="critical"
            onClick={(e) => {
            }}
          />
        </Menu> */
        }
      </div>
    </div>
  );
}
