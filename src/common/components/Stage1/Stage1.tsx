import {library} from "@fortawesome/fontawesome-svg-core"
import {faLock, faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useMemo, useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {Data, MyComboBox} from "../form/MyComboBox/MyComboBox"
import {countryCodes} from "./countryCodes"
import styles from "./Stage1.module.scss"

library.add(faXmark, faLock)

type Stage1Fields = {
    countryCode: string,
    phoneNumber: string,
}

type Stage1Props = {
    handleComplete: (countryCode: string, phoneNumber: string) => void
}

const Stage1 = ({handleComplete}: Stage1Props) => {
    const {register, control, handleSubmit, setValue, formState: {errors}} = useForm<Stage1Fields>()

    const [alertOpen, setAlertOpen] = useState<boolean>(true)

    const closeAlert = () => {
        setAlertOpen(false)
    }

    const transformedCountryCodes = useMemo(() => (
        countryCodes.map((code) => ({
            id: code.id,
            name: code.country,
            value: `+${code.code}`,
        } as Data))
    ), [])

    const transformPhoneNumber = (phoneNumber: string) => {
        const phone = phoneNumber.replaceAll(" ", "")

        const firstPart = phone.slice(0, 2)
        const secondPart = phone.slice(2, 5)
        const thirdPart = phone.slice(5, 7)
        const fourthPart = phone.slice(7, 9)
        const fifthPart = phone.slice(9)

        const result = `${firstPart}`
            + `${secondPart ? ` ${secondPart}` : ""}`
            + `${thirdPart ? ` ${thirdPart}` : ""}`
            + `${fourthPart ? ` ${fourthPart}` : ""}`
            + `${fifthPart ? ` ${fifthPart}` : ""}`

        setValue("phoneNumber", result)
    }

    const handleStage1 = (data: Stage1Fields) => {
        const phone = data.phoneNumber.replaceAll(" ", "")

        handleComplete(data.countryCode, phone)
    }

    return (
        <section className={styles.stage1}>
            <form onSubmit={handleSubmit(handleStage1)}>
                <h1>Registration</h1>
                <p className={styles.desc}>
                    Fill in the registration data. It will take a couple of minutes.<br/>
                    All you need is a phone number and e-mail
                </p>
                {alertOpen && <Alert closeAlert={closeAlert}/>}
                <fieldset className={styles.phoneSet}>
                    <p className={styles.formDesc}>Enter your phone number</p>
                    <div className={styles.phoneWrapper}>
                        <Controller
                            name="countryCode"
                            control={control}
                            defaultValue={transformedCountryCodes[0].value}
                            render={({field}) => <MyComboBox {...field}
                                                             data={transformedCountryCodes}
                                                             className={styles.countryCode}/>}
                        />
                        <input type="tel"
                               {...register("phoneNumber", {required: true})}
                               placeholder="555 555-1234"
                               onChange={e => transformPhoneNumber(e.target.value)}/>
                    </div>
                    {errors.phoneNumber && <p className={styles.error}>Phone number is required</p>}
                </fieldset>
                <button type="submit" className={styles.submitButton}>Send code</button>
            </form>
        </section>
    )
}

export default Stage1

interface AlertProps {closeAlert: () => void}

const Alert = ({closeAlert}: AlertProps) => (
    <div className={styles.alert}>
        <FontAwesomeIcon className={styles.lockIcon} icon={faLock}/>
        <p>
            We take privacy issues seriously. You can be sure that your personal data is securely protected.
        </p>
        <button className={styles.cross} onClick={closeAlert}>
            <FontAwesomeIcon className={styles.crossIcon} icon={faXmark}/>
        </button>
    </div>
)
