import {faCheck, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import styles from "./Stage3.module.scss";

type Stage3Fields = {
    email: string,
    password: string,
}

type Stage3Props = {
    phone: string
    handleComplete: (email: string, password: string) => void
}

enum PasswordStrength {
    WEAK = "weak",
    MEDIUM = "medium",
    STRONG = "strong"
}

const Stage3 = ({phone, handleComplete}: Stage3Props) => {

    const {register, handleSubmit, setError, formState: {errors}} = useForm<Stage3Fields>();

    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

    const handlePasswordChange = (password: string) => {
        setPasswordStrength(getPasswordStrength(password));
    };

    const handleStage3 = (data: Stage3Fields) => {
        if (passwordStrength === PasswordStrength.WEAK) {
            setError("password", {type: "manual", message: "Password is too weak"});
            return;
        }
        handleComplete(data.email, data.password);
    };

    const getPasswordStrengthComponent = (): ReactNode => {
        switch (passwordStrength) {
            case PasswordStrength.WEAK:
                return (
                    <div className={`${styles.passwordStrength} ${styles.weakPassword}`}>
                        <FontAwesomeIcon className={styles.warningSign} icon={faExclamationTriangle}/>
                        <p>Weak password</p>
                    </div>
                );
            case PasswordStrength.MEDIUM:
                return (
                    <div className={`${styles.passwordStrength} ${styles.mediumPassword}`}>
                        <p>Medium password</p>
                    </div>
                );
            case PasswordStrength.STRONG:
                return (
                    <div className={`${styles.passwordStrength} ${styles.strongPassword}`}>
                        <FontAwesomeIcon icon={faCheck}/>
                        <p>Strong password</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={styles.phoneBox}>
                <h2>{phone}</h2>
                <div className={styles.confirmedWrapper}>
                    <FontAwesomeIcon className={styles.checkSign} icon={faCheck}/>
                    <p>Number confirmed</p>
                </div>
            </div>
            <form className={styles.lastForm} onSubmit={handleSubmit(handleStage3)}>
                <fieldset>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" {...register("email", {required: true})}/>
                        {errors.email?.type === "required" && <span className={styles.error}>Email is required</span>}
                        {errors.email?.type === "pattern" && <span className={styles.error}>Email is not valid</span>}
                    </p>
                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register("password", {required: true})}
                               onChange={(e) => handlePasswordChange(e.target.value)}/>
                        {getPasswordStrengthComponent()}
                        {errors.password?.type === "required" &&
                          <span className={styles.error}>Password is required</span>}
                        {errors.password?.type === "manual"
                            && <span className={styles.error}>{errors.password.message}</span>}
                    </p>
                </fieldset>
                <button className={styles.submitButton} type="submit">Register now</button>
            </form>
        </>
    );
};

export default Stage3;

function getPasswordStrength(password: string): PasswordStrength | null {
    if (password.length === 0) {
        return null;
    }
    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }
    if (/\d/.test(password)) {
        strength++;
    }
    if (/[a-z]/.test(password)) {
        strength++;
    }
    if (/[A-Z]/.test(password)) {
        strength++;
    }
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        strength++;
    }
    if (strength === 1 || strength === 2) {
        return PasswordStrength.WEAK;
    } else if (strength === 3 || strength === 4) {
        return PasswordStrength.MEDIUM;
    }
    return PasswordStrength.STRONG;
}