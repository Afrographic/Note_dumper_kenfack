import { useEffect, useMemo, useRef, useState } from "react";
import dropDownImage from "../../assets/images/dropdown.svg";

export default function Select({
  data = [],
  value = null,
  placeholder = "Selectionner...",
  onChange,
  label,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  const selectedOption = useMemo(() => {
    return data.find((o) => o.value === value);
  }, [data, value]);

  const filtereddata = useMemo(() => {
    return data.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(option) {
    onChange?.(option.value);
    setOpen(false);
    setSearch("");
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        // width: "100%",
        flex: "1",
        border: "1px solid rgb(240 240 240)",
        borderRadius: 6,
        padding: "4px 16px",
        cursor: "pointer",
        background: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1" }}>
        <div style={{ fontSize: "12px" }}>{label}</div>
        <div onClick={() => setOpen(!open)} style={{}}>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
      </div>

      <img
        src={dropDownImage}
        alt=""
        style={{ width: "11px", opacity: "0.5" }}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            marginTop: 4,
            border: "1px solid #ccc",
            borderRadius: 6,
            background: "#fff",
            zIndex: 1000,
            maxHeight: 250,
            overflowY: "auto",
            top: "50px",
            boxShadow: "0 4px 10px rgba(0,0,0,.1)",
          }}
        >
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherche..."
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderBottom: "1px solid #ddd",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {filtereddata.length === 0 && (
            <div
              style={{
                padding: 10,
                color: "#999",
              }}
            >
              No results
            </div>
          )}

          {filtereddata.map((option, index) => (
            <div
              key={option.value + Math.random()}
              onClick={() => select(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
