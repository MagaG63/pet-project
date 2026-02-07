import { useNavigate } from "react-router";
import "./ButtonOrder.css";

export default function ButtonOrder(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <button className="detailButtonBuy" onClick={() => navigate(`/buy-form`)}>
      Заказать
    </button>
  );
}
