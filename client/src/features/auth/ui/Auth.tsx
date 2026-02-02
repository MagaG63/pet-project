import {
  loginThunk,
  registerThunk,
} from "../../../entities/user/model/user.thunks";
import {
  LoginFormSchema,
  RegisterFormSchema,
} from "../../../entities/user/model/user.schemas";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { useState } from "react";
import "./Auth.css"

export default function Auth(): React.JSX.Element {
  const [form, setForm] = useState(true);
  const dispatch = useAppDispatch();

  const handleSubmitLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const valid = LoginFormSchema.parse(data);
    dispatch(loginThunk(valid));
  };

  const handleSubmitReg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const valid = RegisterFormSchema.parse(data);
    dispatch(registerThunk(valid));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{form ? "Вход" : "Регистрация"}</h2>
          <button className="switch-btn" onClick={() => setForm(!form)}>
            {form ? "Зарегистрироваться" : "Войти"}
          </button>
        </div>

        {form ? (
          <form onSubmit={handleSubmitLog} className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            <div className="input-group">
              <label>Пароль</label>
              <input type="password" name="password" required />
            </div>
            <button type="submit" className="submit-btn">
              Войти
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitReg} className="auth-form">
            <div className="input-group">
              <label>Имя</label>
              <input type="text" name="name" required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            <div className="input-group">
              <label>Пароль</label>
              <input type="password" name="password" required />
            </div>
            <div className="input-group">
              <label>Описание</label>
              <input type="text" name="desc" />
            </div>
            <button type="submit" className="submit-btn">
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
