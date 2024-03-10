import { i18nInstance } from "@/common/i18n";
import { cloneElement, FC, ReactElement } from "react";
import {
  Trans,
  TransProps as I18nTransProps,
  useTranslation,
} from "react-i18next";

type Translations = Record<string, ReactElement<typeof Trans>>;
export interface TransProps<T extends Translations>
  extends Omit<I18nTransProps<string>, "i18nKey"> {
  i18nKey: keyof T;
}

export const createTrans =
  <T extends Translations>(translations: T): FC<TransProps<T>> =>
  ({ i18nKey, ...props }) => {
    const { t } = useTranslation("shared", { i18n: i18nInstance });

    return cloneElement(translations[i18nKey], { t, ...props });
  };

export type TransKeys<C> = C extends FC<TransProps<infer P>> ? keyof P : never;
