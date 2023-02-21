import {faLock, faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useState} from "react"
import Header from "../../components/Header/Header"
import Stage1 from "../../components/Stage1/Stage1"
import styles from "./HomePage.module.scss"

type Stages = 1 | 2 | 3

const HomePage: React.FC = () => {

    const [stage, setStage] = useState<Stages>(1)

    const [alertOpen, setAlertOpen] = useState<boolean>(true)

    const closeAlert = () => {
        setAlertOpen(false)
    }

    const [countryCode, setCountryCode] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const handleStage1 = (countryCode: string, phoneNumber: string) => {
        setCountryCode(countryCode)
        setPhoneNumber(phoneNumber)
        setStage(2)
    }

    return (
        <main className={styles.home}>
            <Header stage={stage}/>
            <div className={styles.main}>
                <h1>Registration</h1>
                <p className={styles.desc}>
                    Fill in the registration data. It will take a couple of minutes.<br/>
                    All you need is a phone number and e-mail
                </p>
                {alertOpen && <Alert closeAlert={closeAlert}/>}
                {stage === 1 && <Stage1 handleComplete={handleStage1}/>}
                {stage === 2 && <h1>Yes</h1>}
            </div>
        </main>
    )
}

export default HomePage


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