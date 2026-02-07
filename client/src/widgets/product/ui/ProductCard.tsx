import type { Product } from "../../../entities/product/model/product.types";
import "./ProductCard.css"
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props): React.JSX.Element {
  return (
    <div className='productCard'>
      <img
        className='productImage'
        src={product.img}
        alt={product.name}
      />
      <h2 className='productName'>{product.name}</h2>
      <p className='productPrice'>{product.price}</p>
    </div>
  );
}
