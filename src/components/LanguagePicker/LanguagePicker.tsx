import React, { FC, useState } from "react";
import { useStyles } from "@/components/LanguagePicker/LanguagePicker.styles";
import { Group, Menu, UnstyledButton, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { EEFlag, GBFlag } from "mantine-flagpack";

interface LanguagePickerProps {}

export const LanguagePicker: FC<LanguagePickerProps> = () => {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState("en");
  const items = [
    <Menu.Item
      icon={<GBFlag w={16} radius="xl" />}
      onClick={() => {
        setSelected("en");
        i18n.changeLanguage("en");
      }}
      key={"en"}
    >
      <Text>EN</Text>
    </Menu.Item>,
    <Menu.Item
      icon={<EEFlag w={16} radius="xl" />}
      onClick={() => {
        setSelected("et");
        i18n.changeLanguage("et-EE");
      }}
      key={"et-ee"}
    >
      <Text>EE</Text>
    </Menu.Item>,
  ];

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width={100}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            {selected === "en" ? (
              <GBFlag w={16} radius="xl" />
            ) : (
              <EEFlag w={16} radius="xl" />
            )}
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
