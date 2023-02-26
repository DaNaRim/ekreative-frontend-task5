import {faArrowRotateRight, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import {useMobileMediaQuery} from "../../utils/ResponsiveWrappers";
import styles from "./Stage2.module.scss";

type Stage2Props = {
    phone: string,
    handleComplete: () => void
    backToStage1: () => void
}

const RIGHT_CODE: number = 1234;
const CODE_LENGTH: number = RIGHT_CODE.toString().length;

const Stage2 = ({phone, handleComplete, backToStage1}: Stage2Props) => {
    const isMobile = useMobileMediaQuery();

    const {register, handleSubmit, setError, setValue, formState: {errors}} = useForm<{code: string}>();

    const handleCodeChange = (code: string) => {
        const result = code.replace(/\D/g, "").slice(0, CODE_LENGTH);
        setValue("code", result);
    };

    const handleResendCode = () => {
        alert(`Your code is ${RIGHT_CODE}`);
    };

    const handleStage2 = (data: {code: string}) => {
        if (Number(data.code) === RIGHT_CODE) {
            handleComplete();
        } else {
            setError("code", {type: "manual", message: "Wrong code"});
        }
    };

    return (
        <>
            <div className={`${styles.phoneBox} ${isMobile ? styles.phoneBoxMobile : ""}`}>
                <div className={styles.leftWrapper}>
                    <h2>{phone}</h2>
                    <p>Number not confirmed yet</p>
                </div>
                <button onClick={backToStage1}>
                    <FontAwesomeIcon className={styles.penIcon} icon={faPen}/>
                </button>
            </div>
            <form className={`${styles.codeForm} ${isMobile ? styles.codeFormMobile : ""}`}
                  onSubmit={handleSubmit(handleStage2)}>
                <div className={styles.codeWrapper}>
                    <div className={styles.leftSide}>
                        <h2>Confirmation code</h2>
                        <input type="number" id="code"
                               {...register("code", {required: true, min: CODE_LENGTH})}
                               onChange={e => handleCodeChange(e.target.value)}/>
                        <p>Confirm phone number with code from sms message</p>
                    </div>
                    <button type="button" className={styles.sendAgain} onClick={handleResendCode}>
                        <FontAwesomeIcon icon={faArrowRotateRight}/>
                        <span>Send again</span>
                    </button>
                </div>
                {errors.code?.type === "required" && <p className={styles.error}>Code is required</p>}
                {errors.code?.type === "min" && <p className={styles.error}>Code must be 4 digits</p>}
                {errors.code?.type === "manual" && <p className={styles.error}>{errors.code.message}</p>}
                <button className={styles.submitButton} type="submit">Confirm</button>
            </form>
        </>
    );
};

export default Stage2;