import "./Backet.css";
import { useAppSelector } from "../../../shared/lib/hooks";
import BacketCard from "../../../widgets/backet-card/ui/BacketCard";
import ButtonOrder from "../../../features/button-order/ButtonOrder";

export default function Backet(): React.JSX.Element {
  const products = useAppSelector((str) => str.product.basket);

  return (
    <div className="mainPageContainer">
      <p className="sum">
        общая сумма{" "}
        {products?.reduce((acc, product) => acc + parseInt(product.price), 0)}
      </p>

      <ButtonOrder />
      <div className="productsGrid">
        {products?.map((product) => (
          <div key={product.id} className="productWrapper">
            <BacketCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
