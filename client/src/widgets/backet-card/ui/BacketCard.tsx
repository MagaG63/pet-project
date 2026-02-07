import type { Product } from "../../../entities/product/model/product.types";
import ButtonDeleteBacket from "../../../features/button-delete-backet/ButtonDeleteBacket";
import ButtonOneProduct from "../../../features/button-oneProduct/ui/ButtonOneProduct";
import "./BacketCard.css";
type Props = {
  product: Product;
};

export default function BacketCard({ product }: Props): React.JSX.Element {
  return (
    <div className="productCard">
      <img className="productImage" src={product.img} alt={product.name} />
      <h2 className="productName">{product.name}</h2>
      <p className="productPrice">{product.price}</p>

      <div className="button">
        <ButtonDeleteBacket id={product.id} />
        <ButtonOneProduct id={product.id} />
      </div>
    </div>
  );
}
