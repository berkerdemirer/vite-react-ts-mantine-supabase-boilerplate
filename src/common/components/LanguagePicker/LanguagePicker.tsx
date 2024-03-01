import React, { FC, useEffect, useState } from "react";
import classes from "./LanguagePicker.module.css";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@mantine/hooks";
import { EEFlag, GBFlag } from "mantine-flagpack";

interface LanguagePickerProps {}

export const LanguagePicker: FC<LanguagePickerProps> = () => {
  const { i18n } = useTranslation();
  const [defaultLanguage, setDefaultLanguage] = useLocalStorage({
    key: "language",
  });
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (defaultLanguage) {
      setSelected(defaultLanguage);
    }
  }, [defaultLanguage]);

  const items = [
    <Menu.Item
      leftSection={<GBFlag className={classes.flag} />}
      onClick={() => {
        setDefaultLanguage("en-US");
        setSelected("en-US");
        i18n.changeLanguage("en");
      }}
      key={"en"}
    >
      EN
    </Menu.Item>,
    <Menu.Item
      leftSection={<EEFlag className={classes.flag} />}
      onClick={() => {
        setDefaultLanguage("et-EE");
        setSelected("et-EE");
        i18n.changeLanguage("et-EE");
      }}
      key={"et-ee"}
    >
      EE
    </Menu.Item>,
  ];

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            {selected === "en-US" ? (
              <GBFlag className={classes.flag} />
            ) : (
              <EEFlag className={classes.flag} />
            )}
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
