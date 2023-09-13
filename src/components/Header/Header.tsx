import React, { FC, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Burger,
  Container,
  Group,
  Header as HeaderMenu,
  Paper,
  rem,
  Transition,
} from "@mantine/core";
import { useStyles } from "@/components/Header/Header.styles";

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}
const Header: FC<HeaderSearchProps> = ({ links }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <HeaderMenu height={rem(60)} mb={24} className={classes.root}>
      <Container className={classes.header}>
        <div>logo</div>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </HeaderMenu>
  );
};

export default Header;
