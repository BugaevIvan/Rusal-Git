import React from "react";
import cl from "./Select.module.css";
import { EPassStatus } from "../../../types/pass";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { setFilter } from '../../../store/reducers/filterReducer';

interface ISelectProps {
    id: string;
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>((props, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <select
            className={cl.Select}
            id={props.id}
            defaultValue=""
            ref={ref}
            onChange={e => dispatch(setFilter({ key: props.id, value: e.target.value }))}
        >
            <option value="" key="defaultValue" disabled hidden>
                Статус пропуска
            </option>
            {Object.entries(EPassStatus).map(([key, value]) => (EPassStatus.UNDEFINED !== value ?
                <option key={key} value={value}>
                    {value}
                </option>
                : null))}
        </select>
    );
});

export default Select;
