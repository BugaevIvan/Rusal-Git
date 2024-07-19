import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { setUser } from "../store/reducers/userReducer";
import MyService from "../api/MyService";
import { IUser } from "../types/user";
import { ILoginResponse } from "../types/loginResponse";
import "../css/Auth.scss";

const Auth: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const errorRef = useRef<HTMLDivElement | null>(null);
    const [userName, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    async function login(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response: ILoginResponse | string = await MyService.Login(userName, password);
            if (typeof response === "object" && "accessToken" in response && "userId" in response && "userName" in response) {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('userName', response.userName);
                dispatch(setUser({ userId: response.userId, userName: response.userName } as IUser))
                response ? navigate("/main") : (errorRef.current!.style.display = "flex");
            } else {
                errorRef.current!.style.display = "flex";
            }
        } catch (error) {
            errorRef.current!.style.display = "flex";
            console.error(error);
        }
    }

    const isButtonDisabled = !userName || !password;

    return (
        <div id="center-auth">
            <div id="title">Авторизация</div>
            <div id="line"></div>
            <div id="form-block">
                <form>
                    <div className="blocks-input">
                        <div className="input-block">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input
                                type="text"
                                autoComplete="off"
                                maxLength={256}
                                name="username"
                                onChange={(e) => setName(e.target.value)}
                                id="username"
                                required
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="passwordword"
                                autoComplete="off"
                                maxLength={256}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                required
                            />
                        </div>
                        <div className="div-btn">
                            <button
                                type="submit"
                                id="login"
                                onClick={login}
                                disabled={isButtonDisabled}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="error" ref={errorRef}>
                Имя пользователя или пароль неверны!
            </div>
        </div>
    );
};

export default Auth;
