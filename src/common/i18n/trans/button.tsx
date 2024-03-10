import { createTrans } from "@/common/i18n/trans/index";
import { Trans } from "react-i18next";

export const TransButton = createTrans({
  test: <Trans i18nKey="button.test" defaults="test" />,
});
