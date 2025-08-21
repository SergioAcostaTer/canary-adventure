import { useTranslations } from "next-intl";

export const revalidate = 60; // ISR

export default function ExperiencesPage() {
  const t = useTranslations("experiences");
  return (
    <div>
      <h1>{t("title")} </h1>
    </div>
  );
}
