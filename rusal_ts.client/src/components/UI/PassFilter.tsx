import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./select/Select";
import InputDate from "./inputDate/InputDate";
import InputText from "./inputText/InputText";
import BlueButton from "./blueButton/BlueButton";
import GreenButton from "./greenButton/GreenButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { EPassStatus } from "../../types/pass";
import { addTriangle } from "./table/Table";
import { clearSelectedPassId, setSortedPasses } from "../../store/reducers/passReducer";
import { clearFilter } from "../../store/reducers/filterReducer";

const PassFilter: React.FC = () => {

    const filterSelector = useSelector((state: RootState) => state.filterSelector);
    const passesSelector = useSelector((state: RootState) => state.passesSelector);
    const selectedPassIdSelector = useSelector((state: RootState) => state.selectedPassIdSelector);
    const sortedPassesSelector = useSelector((state: RootState) => state.sortedPassesSelector);

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const statusSelectRef = useRef<HTMLSelectElement>(null);
    const datefromRef = useRef<HTMLInputElement>(null);
    const datetoRef = useRef<HTMLInputElement>(null);
    const passIdOrNumberRef = useRef<HTMLInputElement>(null);

    const updateBtnRef = useRef<HTMLInputElement>(null);
    const searchBtnRef = useRef<HTMLInputElement>(null);
    const openBtnRef = useRef<HTMLInputElement>(null);

    // Событие на кнопку ОБНОВИТЬ
    // Обновить таблицу, сбросить фильтры
    function updateFilters() {
        dispatch(clearFilter())
        dispatch(clearSelectedPassId());
        dispatch(setSortedPasses([...passesSelector.passes]));
        addTriangle();
        if (openBtnRef.current) openBtnRef.current.style.display = "none";
        if (statusSelectRef.current) statusSelectRef.current.value = "";
        if (datefromRef.current) datefromRef.current.value = "";
        if (datetoRef.current) datetoRef.current.value = "";
        if (passIdOrNumberRef.current) passIdOrNumberRef.current.value = "";
    }

    // Выбрать строку или отменить выбор строки
    useEffect(() => {
        if (openBtnRef.current) {
            openBtnRef.current.style.display = selectedPassIdSelector ? "block" : "none";
        }
    }, [selectedPassIdSelector.value]);

    // Поиск элемента по фильтрам 
    function searchPass() {
        console.log(localStorage.getItem('jwt'));
        if (typeof passesSelector.passes !== 'object') {
            console.error("data is not an array:", passesSelector.passes);
            return;
        }

        if (typeof filterSelector !== 'object' || filterSelector === null) {
            console.error("filter is not an object:", filterSelector);
            return;
        }

        // Находим элементы которые соответствуют всем фильтрам
        const filterredPasses = passesSelector.passes.filter((objTable) => {

            // Полное соответствие
            let allMatch = true;

            // Check passIdOrNumber
            if (filterSelector.passIdOrNumber) {
                if (
                    !objTable.passId.includes(filterSelector.passIdOrNumber) &&
                    !objTable.number.includes(filterSelector.passIdOrNumber)
                ) {
                    allMatch = false;
                }
            }

            // Check datefrom and dateto
            if (filterSelector.datefrom && new Date(objTable.datefrom) < new Date(filterSelector.datefrom)) {
                allMatch = false;
            }
            if (filterSelector.dateto && new Date(objTable.dateto) > new Date(filterSelector.dateto)) {
                allMatch = false;
            }

            // Check status
            if (filterSelector.status !== EPassStatus.UNDEFINED)
                if (objTable.status !== filterSelector.status as string) {
                    allMatch = false;
                }

            return allMatch;
        });

        dispatch(setSortedPasses(filterredPasses));

        if (selectedPassIdSelector.value && !filterredPasses.some(pass => pass.passId === selectedPassIdSelector.value))
            dispatch(clearSelectedPassId());

        addTriangle()
    }

    // Прячем кнопку если в отсортированно списке нет этого пропуска
    useEffect(() => {
        if (Array.isArray(sortedPassesSelector.sortedPasses) && !sortedPassesSelector.sortedPasses.find((searchElement) => searchElement["passId"] === selectedPassIdSelector.value))
            if (openBtnRef.current)
                openBtnRef.current.style.display = "none";
    }, [sortedPassesSelector.sortedPasses, selectedPassIdSelector.value]);

    return (
        <div id="options">
            <div id="left_options">
                <InputText
                    name="passIdOrNumber"
                    id="passIdOrNumber"
                    placeholder="Номер или код пропуска"
                    ref={passIdOrNumberRef}
                />
                <BlueButton value="ПОИСК" id="search" onClick={searchPass} ref={searchBtnRef} />
                <InputDate
                    name="datefrom"
                    id="datefrom"
                    title="от"
                    ref={datefromRef}
                />
                <InputDate
                    name="dateto"
                    id="dateto"
                    title="до"
                    ref={datetoRef}
                />
                <Select
                    id="status"
                    ref={statusSelectRef}
                />
                <BlueButton
                    value="ОБНОВИТЬ"
                    id="update"
                    onClick={updateFilters}
                    ref={updateBtnRef}
                />
            </div>
            <div id="right_options">
                <GreenButton
                    value="ОТКРЫТЬ"
                    id="open_pass"
                    ref={openBtnRef}
                    onClick={() => navigate(`/pass/${selectedPassIdSelector.value}`, { state: { selectedPassId: selectedPassIdSelector.value } })}
                />
                <BlueButton
                    value="ДОБАВИТЬ"
                    id="add_pass"
                    onClick={() => navigate(`/pass`)}
                />
            </div>
        </div>
    );
};

export default PassFilter;
