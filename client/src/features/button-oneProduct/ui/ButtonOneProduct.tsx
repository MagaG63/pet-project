import { useNavigate } from "react-router";
import "./ButtonOneProduct.css";
type Props = {
  id: number;
};

export default function ButtonOneProduct({ id }: Props): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <button className="detailButton" onClick={() => navigate(`/product/${id}`)}>
      Подробнее
    </button>
  );
}
