import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { productThunk } from "../../../entities/product/model/product.thunk";
import ProductCard from "../../../widgets/product/ui/ProductCard";

export default function MainPage(): React.JSX.Element {
  const products = useAppSelector((str) => str.product.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productThunk());
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
