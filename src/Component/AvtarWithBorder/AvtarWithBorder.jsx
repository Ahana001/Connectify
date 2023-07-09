import "./AvtarWithBorder.css";

export function AvtarWithBorder({ url }) {
  return (
    <div className="UserAvtar">
      <div className="UserAvtarImageContainer">
        <img src={url ?? "../asserts/user.png"} alt="avtar" />
      </div>
    </div>
  );
}
