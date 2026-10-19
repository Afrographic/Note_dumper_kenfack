import PrimaryButton from "../../../../components/primary_button/primary_button";
import Select from "../../../../components/select/Select";
import { useEffect, useState, useContext } from "react";
import "./note.css";
import searchImage from "./../../../../assets/images/search.svg";

export default function Note() {
  const [classe_id, setClasseId] = useState("");
  return (
    <div>
      <div className="page-title note-title">
        <h2>Notes</h2>
        <Select
          label="Annee Scolaire"
          value={classe_id}
          data={[
            {
              label: "text",
              value: "ef",
            },
          ]}
          onChange={(val) => loadStudents(val)}
        ></Select>
        <Select
          label="Classe"
          value={classe_id}
          data={[
            {
              label: "text",
              value: "ef",
            },
          ]}
          onChange={(val) => loadStudents(val)}
        ></Select>
        <Select
          label="Matiere"
          value={classe_id}
          data={[
            {
              label: "text",
              value: "ef",
            },
          ]}
          onChange={(val) => loadStudents(val)}
        ></Select>
        <Select
          label="Sequence"
          value={classe_id}
          data={[
            {
              label: "text",
              value: "ef",
            },
          ]}
          onChange={(val) => loadStudents(val)}
        ></Select>

        <PrimaryButton
          label="Importer les notes"
          onClick={() => {
            set_show_create(true);
          }}
        />
      </div>
      <div className="search-box note-search-box">
        <input type="text" placeholder="Rechercher un eleve..." />
        <img src={searchImage} alt="" />
      </div>
      <div>
        <table>
          <tr>
            <th>Noms et prenoms</th>
            <th>Note</th>
          </tr>
          <tr>
            <td>Tesse Brunel</td>
            <td>17</td>
          </tr>
          <tr>
            <td>Tesse Brunel</td>
            <td>17</td>
          </tr>
          <tr>
            <td>Tesse Brunel</td>
            <td>17</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
