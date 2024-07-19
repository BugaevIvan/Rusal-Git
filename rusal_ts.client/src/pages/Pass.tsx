import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../components/UI/dropdown/Dropdown";
import SelectPass from "../components/UI/select/SelectPass";
import InputPass from "../components/UI/inputDate/InputPass";
import fieldConfig from "../snippet/data.json";
import MyService from "../api/MyService";
import "../css/Pass.scss";
import rusal from "../img/rusal.png";
import { IPass, IPassDto } from "../types/pass";

interface LocationState {
    selectedPassId: string;
}

const Pass: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const selectedPassId: string | undefined = state?.selectedPassId;
    const [pass, setPass] = useState<IPass>();
    const [isEditMode, setIsEditMode] = useState(selectedPassId === undefined ? true : false);
    const [isPassAdded, setIsPassAdded] = useState<boolean>(selectedPassId !== undefined);
    const [canSave, setCanSave] = useState<boolean>(false);
    const saveBtnRef = useRef<HTMLButtonElement>(null);

    // Загрузка страницы
    useEffect(() => {
        fetchPass();
    }, [selectedPassId]);

    // Получение данных с сервера
    async function fetchPass() {
        try {
            if (typeof selectedPassId !== "undefined") {
                const response = await MyService.GetPass(selectedPassId);
                setPass(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Добавление нового пропуска
    async function PostPass(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const formData = new FormData(document.getElementById("FormId") as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as IPassDto;
        try {
            const response = await MyService.PostPass(data);
            setPass(response);
            setIsPassAdded(true);
            setIsEditMode(false);
            setCanSave(false);
        } catch (error) {
            console.error(error);
        }
    }

    // Сохранение изменений пропуска
    async function updatePass(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const formData = new FormData(document.getElementById("FormId") as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as IPassDto;
        try {
            const response = await MyService.UpdatePass({
                ...data,
                passId: pass?.passId,
                dateApply: pass?.dateApply,
                number: pass?.number,
            } as IPass);
            setPass(response);
            setIsEditMode(false);
            setCanSave(false);
        } catch (error) {
            console.error(error);
        }
    }
    function drawColumn(numCol: number) {
        const fromData = numCol === 1 ? "first_column" : "second_column";
        return fieldConfig[fromData].map((field) =>
            field.tag === "select" ? (
                <SelectPass
                    id={field.id}
                    title={field.title}
                    isEditMode={isEditMode}
                    value={pass ? pass[field.id as keyof IPass] : "undefined"}
                    onChange={checkField}
                />
            ) : (
                <InputPass
                    id={field.id}
                    type={field.type}
                    title={field.title}
                    isEditMode={isEditMode}
                    value={pass ? pass[field.id as keyof IPass] : "undefined"}
                    onChange={checkField}
                />
            )
        );
    }

    /**
     * Проверка заполнено ли поле
     * @param event
     */
    function checkField(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        event.preventDefault();

        if (typeof pass !== "undefined") {
            if (pass[event.target.id as keyof IPass] === event.target.value) { }
            else if (!event.target.value)
                event.target.style.borderBottom = '3px red solid';
            else event.target.style.borderBottom = '#979797 2px solid';
        }
        const formData = new FormData(document.getElementById("FormId") as HTMLFormElement);
        const data = Object.fromEntries(formData.entries()) as unknown as IPassDto;
        if (pass) {
            if (Object.entries(data).every(([key, value]) => pass[key as keyof IPass] === value)) {
                if (saveBtnRef.current) setCanSave(false);
            }
            else {
                if (saveBtnRef.current) setCanSave(true);
            }
        }
    }

    return (
        <div id="center-pass">
            <div id="title">
                <div id="left-title">
                    <img src={rusal} alt="rusal" width="45" height="50" />
                    <div id="title-content">
                        <Link to={"/main"}>Эл. Проходная</Link>
                    </div>
                    <div id="sign">&#62;</div>
                    <div id="current-page">Пропуск</div>
                </div>
                <Dropdown />
            </div>
            <div id="forma">
                <form id="FormId">
                    {/* Отрисовка пропуска */}
                    <div id="columns">
                        <div className="column">{drawColumn(1)}</div>
                        <div className="column">{drawColumn(2)}</div>
                    </div>
                    <div id="for_input">
                        {isPassAdded === false ? (
                            <button type="button" id="add_pass" onClick={PostPass}>
                                ДОБАВИТЬ
                            </button>
                        ) : isEditMode === false ? (
                            <>
                                <button
                                    type="button"
                                    id="edit_pass"
                                    onClick={() => setIsEditMode(true)}
                                >
                                    РЕДАКТИРОВАТЬ
                                </button>
                                <button type="button" id="print_pass">
                                    ОТПРАВИТЬ НА ПЕЧАТЬ
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button"
                                    id="save_pass"
                                    onClick={updatePass}
                                    ref={saveBtnRef}
                                    disabled={!canSave}
                                >
                                    СОХРАНИТЬ
                                </button>
                                <button
                                    type="button"
                                    id="cancel_pass"
                                    onClick={() => setIsEditMode(false)}
                                >
                                    ОТМЕНИТЬ
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Pass;
