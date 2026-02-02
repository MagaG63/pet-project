import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { useParams } from "react-router";
import { oneProductThunk } from "../../../entities/product/model/product.thunk";

export default function OneProduct(): React.JSX.Element {
  const { id } = useParams();
  const product = useAppSelector((str) => str.product.currentProduct);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(oneProductThunk(Number(id)));
  }, []);


  return (
    <>
      <img src={product?.img} alt="нету" />
      <h2>{product?.name}</h2>
      <h4>{product?.price}</h4>
      <p>{product?.desc}</p>
    </>
  );
}
