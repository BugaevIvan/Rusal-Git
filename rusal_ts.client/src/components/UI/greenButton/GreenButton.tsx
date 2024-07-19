import React, { MouseEventHandler, RefObject } from 'react'
import cl from './GreenButton.module.css'
interface IGreenButtonProps {
    value: string;
    id: string;
    ref: RefObject<HTMLInputElement>;
    //    //onBtnClick?: () => React.MouseEvent<HTMLInputElement, MouseEvent>;
        onClick?: MouseEventHandler<HTMLInputElement>;
    //onBtnClick: Promise<void>;
}

const GreenButton = React.forwardRef<HTMLInputElement, IGreenButtonProps>((props,ref) => {
    return (
        <input type="button" className={cl.GreenButton} {...props} ref={ref } />
        //<input type="button" className={cl.GreenButton} onClick={props.onBtnClick} value={props.value} id={props.id}  />
    )
})

export default GreenButton