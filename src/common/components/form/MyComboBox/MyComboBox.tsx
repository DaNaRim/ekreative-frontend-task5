import {faCaretDown, faCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Combobox, Transition} from "@headlessui/react"
import React, {Fragment, useState} from "react"
import {ControllerRenderProps} from "react-hook-form"
import styles from "./MyComboBox.module.scss"

export interface Data {
    id: string
    name: string
    value: string
}

interface ComboBoxProps extends ControllerRenderProps {
    data: Data[]
    className?: string
}

export const MyComboBox = React.forwardRef<
    HTMLInputElement,
    ComboBoxProps
>((props, ref) => {
    const {data, className} = props

    const [query, setQuery] = useState<string>("")

    const filteredData =
        query === ""
            ? data
            : data.filter((dataEntity) =>
                dataEntity.name
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(query.toLowerCase().replace(/\s+/g, ""))
                || dataEntity.value
                             .toLowerCase()
                             .replace(/\s+/g, "")
                             .includes(query.toLowerCase().replace(/\s+/g, "")),
            )

    return (
        <Combobox
            defaultValue={props.value}
            onChange={props.onChange}
            refName={props.name}
        >
            <div className={`${styles.combobox} ${className ? className : ""}`}>
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
                        {filteredData.length === 0 && query !== "" && (
                            <div className={styles.notFound}>Nothing found.</div>
                        )}
                        {filteredData.length !== 0 && (filteredData.map((dataEntity) => (
                            <OptionEntity key={dataEntity.id} dataEntity={dataEntity}/>
                        )))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
})

interface OptionEntityProps {
    dataEntity: Data
}

const OptionEntity = ({dataEntity}: OptionEntityProps) => (
    <Combobox.Option
        key={dataEntity.id}
        className={styles.option}
        value={dataEntity.value}
    >
        {({selected}) => (
            <>
                <span className={`${styles.optionText} ${selected ? styles.selected : ""}`}>
                  {/* TODO: maybe add props to display only name or value */}
                  <span>{dataEntity.value}</span>
                  <span>{dataEntity.name}</span>
                </span>
                {selected && (
                    <span className={styles.selectedMark}>
                       <FontAwesomeIcon icon={faCheck}/>
                    </span>
                )}
            </>
        )}
    </Combobox.Option>
)