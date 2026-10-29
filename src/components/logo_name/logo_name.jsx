import "./logo_name.css";
import kenfack_logo_image from "./../../assets/images/kenfack_logo.svg";

export default function LogoName() {
  return (
    <div className="c-main title logo-name-title">
      <img src={kenfack_logo_image} alt="" className="app-logo" />
      Kenfack
    </div>
  );
}
 