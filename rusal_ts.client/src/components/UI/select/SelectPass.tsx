import React from "react";
import { EPassStatus, EPassType, EPassTypePeriod } from "../../../types/pass";

interface ISelectPassProps {
    id: string;
    title: string;
    isEditMode: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectPass: React.FC<ISelectPassProps> = (props) => {
    const tEnum = props.id === "status" ? EPassStatus : props.id === "type" ? EPassType : EPassTypePeriod;
    return (
        <div className="line">
            <label htmlFor={props.id}>{props.title}</label>
            <select
                id={props.id}
                name={props.id}
                disabled={!props.isEditMode}
                onChange={props.onChange}
                style={props.isEditMode === true ? {} : { appearance: "none" }}
                {...props.value === "undefined"
                    ? { defaultValue: "" }
                    : props.isEditMode === true
                        ? {}
                        : { value: props.value }}
            >
                <option value="" key="defaultValue" disabled hidden></option>
                {Object.entries(tEnum).map(([key, option]) => (EPassStatus.UNDEFINED !== option ?
                    <option key={typeof tEnum + "_" + key} value={option}>
                        {option}
                    </option> : null
                ))}
            </select>
        </div>
    );
};

export default SelectPass;
