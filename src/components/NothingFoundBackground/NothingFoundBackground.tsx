import { FC } from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useStyles } from "@/components/NothingFoundBackground/NothingFoundBackground.styles";
import { Illustration } from "@/components/NothingFoundBackground/Illustration";
import { useNavigate } from "react-router-dom";

export const NothingFoundBackground: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position="center">
            <Button size="md" onClick={() => navigate("/")}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};
