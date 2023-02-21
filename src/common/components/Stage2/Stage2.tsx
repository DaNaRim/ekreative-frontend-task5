import {faArrowRotateRight, faPen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useForm} from "react-hook-form"
import styles from "./Stage2.module.scss"

type Stage2Props = {
    countryCode: string,
    phone: string,
    handleComplete: () => void
}

const RIGHT_CODE: number = 1234
const CODE_LENGTH: number = 4

const Stage2 = ({countryCode, phone, handleComplete}: Stage2Props) => {

    const {register, handleSubmit, setError, setValue, formState: {errors}} = useForm<{code: string}>()

    const transformPhoneNumber = () => {
        const firstPart = phone.slice(0, 2)
        const secondPart = phone.slice(2, 5)
        const thirdPart = phone.slice(5, 7)
        const fourthPart = phone.slice(7, 9)
        const fifthPart = phone.slice(9)

        return `${countryCode}`
            + ` ${firstPart}`
            + `${secondPart ? ` ${secondPart}` : ""}`
            + `${thirdPart ? ` ${thirdPart}` : ""}`
            + `${fourthPart ? ` ${fourthPart}` : ""}`
            + `${fifthPart ? ` ${fifthPart}` : ""}`
    }

    const handleCodeChange = (code: string) => {
        const result = code.replace(/\D/g, "").slice(0, CODE_LENGTH)
        setValue("code", result)
    }

    const handleStage2 = (data: {code: string}) => {
        if (Number(data.code) === RIGHT_CODE) {
            handleComplete()
        } else {
            setError("code", {type: "manual", message: "Wrong code"})
        }
    }

    return (
        <>
            <div className={styles.phoneBox}>
                <div className={styles.leftWrapper}>
                    <h2>{transformPhoneNumber()}</h2>
                    <p>Number not confirmed yet</p>
                </div>
                <button>
                    <FontAwesomeIcon className={styles.penIcon} icon={faPen}/>
                </button>
            </div>
            <form className={styles.codeForm} onSubmit={handleSubmit(handleStage2)}>
                <div className={styles.codeWrapper}>
                    <div className={styles.leftSide}>
                        <h2>Confirmation code</h2>
                        <input type="text" id="code"
                               {...register("code", {required: true, min: CODE_LENGTH})}
                               onChange={e => handleCodeChange(e.target.value)}/>
                        <p>Confirm phone number with code from sms message</p>
                    </div>
                    <div className={styles.sendAgain}>
                        <FontAwesomeIcon icon={faArrowRotateRight}/>
                        <span>Send again</span>
                    </div>
                </div>
                {errors.code?.type === "required" && <p className={styles.error}>Code is required</p>}
                {errors.code?.type === "min" && <p className={styles.error}>Code must be 4 digits</p>}
                {errors.code?.type === "manual" && <p className={styles.error}>{errors.code.message}</p>}
                <button className={styles.submitButton} type="submit">Confirm</button>
            </form>
        </>
    )
}

export default Stage2