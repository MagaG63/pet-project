import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { productThunk } from "../../../entities/product/model/product.thunk";
import ProductCard from "../../../widgets/product/ui/ProductCard";
import ButtonOneProduct from "../../../features/button-oneProduct/ui/ButtonOneProduct";
import "./MainPage.css"

export default function MainPage(): React.JSX.Element {
  const products = useAppSelector((str) => str.product.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productThunk());
  }, []);

  return (
    <div className='mainPageContainer'>
      <div className='productsGrid'>
        {products?.map((product) => (
          <div key={product.id} className='productWrapper'>
            <ProductCard product={product} />
            <ButtonOneProduct id={product.id} />
            
          </div>
        ))}
      </div>
    </div>
  );
}
