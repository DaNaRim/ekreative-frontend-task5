import {faLock, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import Header from "../../components/Header/Header";
import Stage1 from "../../components/Stage1/Stage1";
import Stage2 from "../../components/Stage2/Stage2";
import Stage3 from "../../components/Stage3/Stage3";
import styles from "./HomePage.module.scss";

type Stages = 1 | 2 | 3

const HomePage: React.FC = () => {

    const [stage, setStage] = useState<Stages>(1);

    const [countryCode, setCountryCode] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [alertOpen, setAlertOpen] = useState<boolean>(true);

    const closeAlert = () => setAlertOpen(false);

    const handleStage1 = (countryCode: string, phoneNumber: string) => {
        setCountryCode(countryCode);
        setPhoneNumber(phoneNumber);
        setStage(2);
    };

    const handleStage2 = () => setStage(3);

    const backToStage1 = () => setStage(1);

    const handleStage3 = (email: string, password: string) => {
        setEmail(email);
        setPassword(password);
        alert(`Registration complete!\n${JSON.stringify({countryCode, phoneNumber, email, password})}`);

        setCountryCode("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setStage(1);
    };

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

                {stage === 1 && <Stage1 handleComplete={handleStage1}
                                        countryCode={countryCode}
                                        phoneNumber={phoneNumber}/>
                }
                {stage === 2 && <Stage2 handleComplete={handleStage2}
                                        phone={transformPhoneNumber(countryCode, phoneNumber)}
                                        backToStage1={backToStage1}/>
                }
                {stage === 3 && <Stage3 phone={transformPhoneNumber(countryCode, phoneNumber)}
                                        handleComplete={handleStage3}/>
                }
            </div>
        </main>
    );
};

export default HomePage;


interface AlertProps {closeAlert: () => void;}

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
);

export const transformPhoneNumber = (countryCode: string, phone: string) => {
    const firstPart = phone.slice(0, 2);
    const secondPart = phone.slice(2, 5);
    const thirdPart = phone.slice(5, 7);
    const fourthPart = phone.slice(7, 9);
    const fifthPart = phone.slice(9);

    return `${countryCode}`
        + ` ${firstPart}`
        + `${secondPart ? ` ${secondPart}` : ""}`
        + `${thirdPart ? ` ${thirdPart}` : ""}`
        + `${fourthPart ? ` ${fourthPart}` : ""}`
        + `${fifthPart ? ` ${fifthPart}` : ""}`;
};