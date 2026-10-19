import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import male from "./../../../../assets/images/male.svg";
import female from "./../../../../assets/images/female.svg";
import "./prof.css";

export default function ProfItem({ prof ,onDelete,onEdit }) {
  return (
    <div className="prof-item">
      {prof.sex === "M" ? (
        <img src={male} alt="" className="prof-sex-image"/>
      ) : (
        <img src={female} alt="" className="prof-sex-image"/>
      )}
      <div className="f1">
        <div>{prof.name}</div>
        <div className="grey small">0 Classes</div>
      </div>
      <div className="f1">
        <div>{prof.email}</div>
        <div>{prof.phone}</div>
      </div>
      <div className="prof-actions">
        <img src={edit_icon} alt="" title="Editer" onClick={onEdit} />
        <img src={delete_icon} alt="" title="Supprimer" onClick={onDelete}/>
      </div>
    </div>
  );
}
