import { useNavigate } from "react-router";
import { CreateOrderSchema } from "../../../entities/product/model/product.shemas";
import { createOrderThunk } from "../../../entities/product/model/product.thunk";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import "./OrderForm.css";

export default function OrderForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const product = useAppSelector((str) => str.product.basket);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const data = CreateOrderSchema.parse({
      ...formData,
      order: JSON.stringify(product?.map((prt) => `${prt.price} ${prt.name},`)),
    });
    dispatch(createOrderThunk(data));
navigate('/')
  };

  return (
    <div className="conteiner">


    <form onSubmit={handleSubmit} className="buy-form">
      <div className="input">
        <label>Email</label>
        <input type="email" name="email" />
      </div>
      <div className="input">
        <label>Как вам обращатся</label>
        <input type="text" name="name" />
      </div>
      <div className="input">
        <label>Телефон</label>
        <input type="text" name="phone" />
      </div>
      <div className="product">
        <label className="order-sum">
          Общая сумма заказа{" "}
          {product?.reduce((acc, prt) => acc + parseInt(prt.price), 0)}
        </label>
        {product?.map((prt) => (
          <li className="product">
            {prt.name}
            {"   "}
            {prt.price}
          </li>
        ))}
      </div>
      <button type="submit" className="submit">
        отправить
      </button>
    </form>
    </div>
  );
}
