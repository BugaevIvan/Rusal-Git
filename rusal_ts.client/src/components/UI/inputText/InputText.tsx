import React, { RefObject } from 'react'
import cl from './InputText.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setFilter } from '../../../store/reducers/filterReducer';
import { IFilter } from '../../../types/filter';
interface IInputTextProps {
    id: string;
    name: string;
    placeholder: string;
    ref: RefObject<HTMLInputElement>;
    //onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = React.forwardRef<HTMLInputElement, IInputTextProps>((props, ref) => {
    const field = props.id as keyof IFilter;
    const selector = useSelector((state: RootState) => state.filterSelector[field])
    const dispatch = useDispatch<AppDispatch>();
    return (
        <input type="text" value={selector} onChange={e => dispatch(setFilter({ key: props.id, value: e.target.value }))}
            className={cl.InputText}{...props} ref={ref} />
    )
})

export default InputText