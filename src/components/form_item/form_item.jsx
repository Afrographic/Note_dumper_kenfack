import "./form_item.css";

export default function FormItem({ label, onChange, value = "", type, id }) {
  function setValue(val) {
    onChange?.(val);
  }
 
  return (
    <div className="form-item">
      <div>{label}</div>
      {type != "number" ? (
        <input
          id={id}
          type={type || "text"}
          placeholder={label}
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type="number"
          placeholder={label}
          value={value ?? ""}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
