import "./primary_button.css";

export default function PrimaryButton({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="primary-btn"
    >
      {label}
    </div>
  );
}