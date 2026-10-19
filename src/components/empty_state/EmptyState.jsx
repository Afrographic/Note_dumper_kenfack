import empty_img from "./../../assets/images/empty.svg";

export default function EmptyState({ message, visible }) {
  let inactive = "";
  if (!visible) {
    inactive = "inactive";
  }

  return (
    <div className={"empty-state " + inactive} >
      <img src={empty_img} alt="" />
      <div className="empty-state-message">{message}</div>
    </div>
  );
}
