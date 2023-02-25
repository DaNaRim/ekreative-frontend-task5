import {faCaretDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Combobox, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {ControllerRenderProps} from "react-hook-form";
import styles from "./MyComboBox.module.scss";

export interface Data {
    id: string;
    name: string;
    value: string;
}

interface ComboBoxProps extends ControllerRenderProps {
    data: Data[];
    className?: string;
    isDisplayName?: boolean;
    label?: string;
    extraOnChange?: (name: string, value: string) => void;
}

const OVERFLOW_LIMIT = 100;

export const MyComboBox = React.forwardRef<
    HTMLInputElement,
    ComboBoxProps
>((props, ref) => {
    const {data, className, isDisplayName = true, label, extraOnChange} = props;

    const [query, setQuery] = useState<string>("");

    const isOverflow = data.length > OVERFLOW_LIMIT;

    const [preparedData, setPreparedData] = useState<Data[]>([]);
    const [filteredDataLength, setFilteredDataLength] = useState<number>(0);

    const checkMatch = (field: string, query: string): boolean =>
        field.toLowerCase()
             .replace(/\s+/g, "")
             .includes(query.toLowerCase().replace(/\s+/g, ""));

    useEffect(() => {
        let updatedData: Data[];

        if (isOverflow) {
            updatedData = data.filter((dataEntity) =>
                checkMatch(dataEntity.name, query) || checkMatch(dataEntity.value, query),
            );
        } else {
            updatedData = query === ""
                ? data
                : data.filter((dataEntity) =>
                    checkMatch(dataEntity.name, query) || checkMatch(dataEntity.value, query),
                );
        }
        setPreparedData(updatedData.slice(0, OVERFLOW_LIMIT));
        setFilteredDataLength(updatedData.length);
    }, [data, isOverflow, query]);

    const handleOnChange = (value: string) => {
        props.onChange(value);
        if (extraOnChange) {
            const name = preparedData.find((dataEntity) => dataEntity.value === value)?.name || "";
            extraOnChange(name, value);
        }
    };

    return (
        <Combobox
            defaultValue={props.value}
            onChange={handleOnChange}
            refName={props.name}
        >
            <div className={`${styles.combobox} ${className ? className : ""}`}>
                {label && <Combobox.Label className={styles.label}>{label}</Combobox.Label>}
                <div className={styles.inputWrapper}>
                    <Combobox.Input
                        className={styles.input}
                        displayValue={() => props.value}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Combobox.Button className={styles.caretDown}>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className={styles.options}>
                        {preparedData.length === 0 && query !== "" && (
                            <div className={styles.notFound}>Nothing found.</div>
                        )}
                        {preparedData.length !== 0 && (preparedData.map((dataEntity) => (
                            <OptionEntity key={dataEntity.id} dataEntity={dataEntity} isDisplayName={isDisplayName}/>
                        )))}
                        {preparedData.length !== 0 && filteredDataLength > OVERFLOW_LIMIT && (
                            <div className={styles.overflow}>
                                And {filteredDataLength - OVERFLOW_LIMIT} more...
                            </div>
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
});

interface OptionEntityProps {
    dataEntity: Data;
    isDisplayName: boolean;
}

const OptionEntity = ({dataEntity, isDisplayName}: OptionEntityProps) => (
    <Combobox.Option
        key={dataEntity.id}
        className={styles.option}
        value={dataEntity.value}
    >
        {({selected}) => (
            <>
                <span className={`${styles.optionText} ${selected ? styles.selected : ""}`}>
                    <span>{dataEntity.value}</span>
                    {isDisplayName && <span>{dataEntity.name}</span>}
                </span>
                {selected && (
                    <span className={styles.selectedMark}>
                       <FontAwesomeIcon icon={faCheck}/>
                    </span>
                )}
            </>
        )}
    </Combobox.Option>
);