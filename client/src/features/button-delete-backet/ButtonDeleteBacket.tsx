
import { deleteBasket } from "../../entities/product/model/product.slice";
import { useAppDispatch } from "../../shared/lib/hooks";
import "./ButtonDeleteBacket.css";
type Props = {
  id: number;
};

export default function ButtonDeleteBacket({ id }: Props): React.JSX.Element {

const dispatch = useAppDispatch()

const clickHandler = () => {
  dispatch(deleteBasket(id))
}
  return (
    <button className="detailButto" onClick={clickHandler}>
     Удалить
    </button>
  );
}
