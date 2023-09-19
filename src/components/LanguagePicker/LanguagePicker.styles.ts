import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles(
  (theme, { opened }: { opened: boolean }) => ({
    control: {
      width: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,
      transition: "background-color 150ms ease",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[opened ? 5 : 6]
          : opened
          ? theme.colors.gray[0]
          : theme.white,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },

    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },

    icon: {
      marginLeft: rem(4),
      transition: "transform 150ms ease",
      transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    },
  }),
);
