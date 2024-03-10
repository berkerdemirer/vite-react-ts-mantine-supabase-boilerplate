import { FC, useMemo, useState } from "react";
import classes from "./LanguagePicker.module.css";
import { Flex, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { EEFlag, GBFlag } from "mantine-flagpack";
import { i18nInstance, localeConfigurations } from "@/common/i18n";

const mapCountryFlag = (language: string) => {
  if (language === "en") {
    return <GBFlag className={classes.flag} />;
  } else if (language === "et") {
    return <EEFlag className={classes.flag} />;
  }
};

export const LanguagePicker: FC = () => {
  const {
    i18n: { changeLanguage, resolvedLanguage },
  } = useTranslation("project", { i18n: i18nInstance });
  const [opened, setOpened] = useState(false);
  const items = useMemo(() => {
    return Object.entries(localeConfigurations).map(([key, value]) => (
      <Menu.Item
        leftSection={mapCountryFlag(key)}
        onClick={() => {
          void (async () => {
            await changeLanguage(key);

            window.location.reload();
          })();
        }}
        key={key}
      >
        {value.label}
      </Menu.Item>
    ));
  }, [changeLanguage]);

  return (
    <Menu
      onOpen={() => {
        setOpened(true);
      }}
      onClose={() => {
        setOpened(false);
      }}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Flex gap="xs" align="center">
            {mapCountryFlag(resolvedLanguage ?? "en")}
            {resolvedLanguage?.substring(0, 2).toLocaleUpperCase()}
          </Flex>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
