import { Link } from "react-router-dom";

export default function CTAButton({ text, link }) {
  return (
    <Link to={link}>
      <button>{text}</button>
    </Link>
  );
}
