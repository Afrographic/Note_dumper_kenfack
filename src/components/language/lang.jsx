import { useTranslation } from "react-i18next";
import languageImage from "../../assets/images/language.svg";
import "./lang.css";


export default function Lang() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className="languages"
      title={t("changerLaLangue")}
      onClick={toggleLanguage}
    >
      <img src={languageImage} alt="" width={18} />
      <div>{i18n.language == "fr" ? "EN" : "FR"}</div>
    </div>
  );
}
