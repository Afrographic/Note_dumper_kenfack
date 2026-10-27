import "./ToggleButton.css";
import { useState } from "react";

export default function ToggleButtonComponent({ label, onChange,value }) {
  const [active,setActive] = useState(value);

  function activateToggle(){
    let newActive = !active;
    setActive(newActive)
    onChange(newActive);
  }

  return (
    <div className="toggle-item" onClick={()=>activateToggle()}>
      <div className={active ?"toggle-holder active":"toggle-holder"}>
        <div className="toggle-circle"></div>
      </div>
      <div> {label}</div>
    </div>
  );
}
