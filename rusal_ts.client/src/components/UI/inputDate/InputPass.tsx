import React from "react";

interface IInputPassProps {
    type?: string;
    id: string;
    title: string;
    isEditMode: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPass: React.FC<IInputPassProps> = (props) => {
    //const value = props.value === "undefined" ? '' : props.value;
    return (
        <div className="line">
            <label htmlFor={props.id} key={props.id}>{props.title}</label>
            <input
                type={props.type}
                id={props.id}
                name={props.id}
                onChange={props.onChange}
                disabled={!props.isEditMode}
                {...(props.value === "undefined"
                    ? null
                    : props.isEditMode === true
                        ? null
                        : { value: props.value })}
                //value={value}
            />
        </div>
    );
};

export default InputPass;
