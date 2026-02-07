import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { useParams } from "react-router";
import { oneProductThunk } from "../../../entities/product/model/product.thunk";
import './OneProduct.css'
import { addToBasket } from "../../../entities/product/model/product.slice";

export default function OneProduct(): React.JSX.Element {
  const { id } = useParams();
  const product = useAppSelector((str) => str.product.currentProduct);
  const basket = useAppSelector((str) => str.product.basket)
  const dispatch = useAppDispatch();

const addHandle = () => {
dispatch(addToBasket(product))
}
console.log(basket)
  useEffect(() => {
    dispatch(oneProductThunk(Number(id)));
  }, []);

  return (
    <div className="oneProductContainer">
      <div className="oneProductCard">
        <img className="oneProductImage" src={product?.img} alt="нету" />
        <h2 className="oneProductName">{product?.name}</h2>
        <h4 className="oneProductPrice">{product?.price}</h4>
        <p className="oneProductDesc">{product?.desc}</p>
        <button className='detailButton' style={{marginTop: "20px"}} onClick={addHandle}>Добавить в корзину</button>
      </div>
    </div>
  );
}
