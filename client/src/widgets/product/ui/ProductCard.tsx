import type { Product } from "../../../entities/product/model/product.types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props): React.JSX.Element {


  

  return (
<div>
    <img src={product.img} alt="нету" />
    <h2>{product.name}</h2>
    <p>{product.price}</p>
</div>
  );
}
