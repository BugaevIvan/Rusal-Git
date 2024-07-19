import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Table.module.css";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { clearSelectedPassId, setSelectedPassId, setSortedPasses } from "../../../store/reducers/passReducer";
import { IPass } from "../../../types/pass";
import { fetchPasses } from "../../../api/thunk";

type Order = {
    type: "standard" | "asc" | "desc",
    symbol: "" | "▼" | "▲"
}
const initialState: Order = { type: "standard", symbol: "" }

/**
 * Добавление стрелки в колонку
 * @param event Колонка, по которой будет происходить сортировка
 * @param order Порядок сортировки
 */
export const addTriangle = (event: React.MouseEvent<HTMLElement> | null = null, order: Order = initialState) => {
    const trThs: NodeListOf<HTMLTableCellElement> = document.querySelectorAll("#data-container table thead tr th");
    trThs.forEach((th) => th.setAttribute("data-order", "standard"));
    if (event !== null) {
        if (document.getElementById('div_with_order'))
            document.body.removeChild(document.getElementById('div_with_order') as HTMLDivElement);

        const target = event.target as HTMLElement;
        target.setAttribute("data-order", order.type);

        const divWithOrder = document.createElement('div');
        divWithOrder.setAttribute("id", "div_with_order");
        (document.getElementById('center-main') as HTMLDivElement).appendChild(divWithOrder);
        divWithOrder.style.position = 'absolute';
        divWithOrder.style.pointerEvents = "none";
        divWithOrder.innerText += order.symbol;
        divWithOrder.style.left = `${target.getBoundingClientRect().right - divWithOrder.clientWidth - 3}px`;
        divWithOrder.style.top = `${target.getBoundingClientRect().top + (target.getBoundingClientRect().height / 2) - (divWithOrder.clientHeight / 2) + 2}px`;
    }
};

const Table: React.FC = memo(() => {
    const selectedPassIdSelector = useSelector((state: RootState) => state.selectedPassIdSelector.value);
    const passesSelector: IPass[] = useSelector((state: RootState) => state.passesSelector.passes);
    const sortedPassesSelector = useSelector((state: RootState) => state.sortedPassesSelector.sortedPasses);

    const passesStatusSelector = useSelector((state: RootState) => state.passesSelector.status);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    // Id и заголовок для колонок
    const idToTitle = {
        passId: "PassId",
        status: "Статус",
        comment: "Комментарий",
        type: "Тип",
        typePeriod: "Тип периода",
        number: "Номер",
        organization: "Организация",
    };

    //Загрузка страницы
    useEffect(() => {
        // Получение данных с сервера
        dispatch(fetchPasses());
    }, [dispatch]);

    /**
     *  Изменение порядка отображения по определенной колонке
     * @param event Колонка (тэг <th>) по которой будут сортироваться пропуска
     */
    function changesOrder(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        const orderByColumn = target.id as keyof IPass;
        const typeOrderAttr = Array.from(target.attributes).find(
            (x) => x.name === "data-order"
        ) as Attr | undefined;
        if (!typeOrderAttr) {
            console.error("attribute 'data-order' not found");
            return;
        }
        if (!orderByColumn) {
            console.error("target id is null or undefined");
            return;
        }

        /**
         * Сортировка двух 
         * @param a 
         * @param b 
         * @returns 
         */
        const compareValues = (a: IPass, b: IPass): number => {
            const valueA = a[orderByColumn];
            const valueB = b[orderByColumn];

            if (valueA == null && valueB == null) return 0;
            if (valueA == null) return -1;
            if (valueB == null) return 1;
            if (typeof valueA === "string" && typeof valueB === "string") return valueA.localeCompare(valueB,);
            return 0;
        };
        if (passesSelector !== undefined || [...passesSelector].length !== 0)
            if (typeOrderAttr.value === "standard") {
                addTriangle(event, { type: "asc", symbol: "▼" });
                dispatch(setSortedPasses([...passesSelector].sort((a, b) => compareValues(a, b))));
            } else if (typeOrderAttr.value === "asc") {
                addTriangle(event, { type: "desc", symbol: "▲" });
                dispatch(setSortedPasses([...passesSelector].sort((a, b) => compareValues(b, a))));
            } else if (typeOrderAttr.value === "desc") {
                addTriangle(event, { type: "standard", symbol: "" });
                dispatch(setSortedPasses([...passesSelector]));
            }
    }
    //// Клик по строке
    function selectRow(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        const row = target.tagName === 'TR' ? target : target.parentNode as HTMLElement;
        if (!row || row.tagName !== 'TR') return; // Если элемент не <tr>, выходим из функции
        if (!selectedPassIdSelector) {
            row.style.backgroundColor = "#ccc";
            dispatch(setSelectedPassId(row.id));
        } else if (selectedPassIdSelector === row.id) {
            row.style.backgroundColor = "#fff";
            dispatch(clearSelectedPassId());
        } else if (selectedPassIdSelector) {
            const previousSelectedRow =
                document.querySelector(`#data-container table tbody tr[id='${selectedPassIdSelector}']`) as HTMLElement;
            if (previousSelectedRow)
                previousSelectedRow.style.backgroundColor = "#fff";
            row.style.backgroundColor = "#ccc";
            dispatch(setSelectedPassId(row.id));
        }
    }

    let clickTimeout: NodeJS.Timeout | null = null;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            handleDoubleClick(event);
        } else {
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
                selectRow(event);
            }, 140); // 140ms delay
        }
    };

    const handleDoubleClick = async (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const parentNode = target!.parentNode as HTMLElement;
        const row = target.tagName === 'TD' && parentNode.tagName === 'TR' ? parentNode : target;
        row.style.backgroundColor = "#ccc";
        try {
            //const response = await fetchPass(row.id);
            navigate(`/pass/${row.id}`, { state: { selectedPassId: row.id } });

            //navigate(`/pass/${row.id}`, {
            //    state: { response: response },
            //});
        } catch (error) {
            console.error("Failed to fetch pass:", error);
        }
    };

    if (passesStatusSelector === 'loading') {
        { return <p>Loading...</p> }
    } else if (passesStatusSelector === 'failed') {
        { return <div style={{ color: "red" }}>Error!!!</div> }
    }
    else if (passesStatusSelector === 'succeeded') {
        // Рендер таблицы
        return (
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {Object.entries(idToTitle).map(([idToTitleKey, idToTitleValue]) => (
                            <th data-order="standard" key={idToTitleKey} id={idToTitleKey} onClick={changesOrder}>{idToTitleValue}</th>
                        ))}
                    </tr>
                </thead >
                <tbody>
                    {Array.from(sortedPassesSelector).map(pass => (
                        <tr
                            key={pass.passId}
                            id={pass.passId}
                            style={{
                                backgroundColor:
                                    selectedPassIdSelector == null
                                        ? "#fff"
                                        : selectedPassIdSelector === pass.passId
                                            ? "#ccc"
                                            : "#fff",
                            }}
                            onClick={handleClick}
                        >
                            {Object.entries(idToTitle).map(([idToTitleKey]) => (
                                <td key={`${idToTitleKey}_${pass[idToTitleKey as keyof IPass]}`}>{String(pass[idToTitleKey as keyof IPass])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table >
        );
    }
});

export default Table;
