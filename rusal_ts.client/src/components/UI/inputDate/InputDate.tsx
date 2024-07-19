import React, { RefObject } from 'react'
import cl from './InputDate.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setFilter } from '../../../store/reducers/filterReducer';
import { IFilter } from '../../../types/filter';

interface IInputDateProps {
    name: string;
    id: string;
    title: string;
    //onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref: RefObject<HTMLInputElement>
}

const InputDate = React.forwardRef<HTMLInputElement, IInputDateProps>((props, ref) => {
    const field = props.id as keyof IFilter;
    const selector = useSelector((state: RootState) => state.filterSelector[field])
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={cl.date}>
            <div className={cl.left_from_date}>{props.title}</div>
            <input type="date" className={cl.text_field} value={selector} onChange={e => dispatch(setFilter({ key: props.id, value: e.target.value }))} ref={ref} />
        </div>
    )
})

export default InputDate