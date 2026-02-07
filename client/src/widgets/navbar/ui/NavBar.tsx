
import { useNavigate } from "react-router";
import "./NavBar.css"
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { logoutThunk } from "../../../entities/user/model/user.thunks";

export default function NavBar(): React.JSX.Element {
const user = useAppSelector((str) => !!str.user.user)
const dispatch = useAppDispatch()
const navigate = useNavigate()
  const handleSubmit = (): void => {
navigate('/auth')
  }

  const leaveHandle = () => {
    dispatch(logoutThunk())
  }

  return (
    <nav>
      <div className="logo">Заглавное</div>
      <ul className="nav-links">
        <li>
          <a href="/">Главная</a>
        </li>
       <li>
        <a href="/backet">Корзина</a>
       </li>
      </ul>
        <div className="contBtn">
          { user ? (<button className="btn" onClick={leaveHandle}>Выйти</button>) : (<button className="btn" onClick={handleSubmit}>Войти</button>)}
        </div>
    </nav>
  );
}
