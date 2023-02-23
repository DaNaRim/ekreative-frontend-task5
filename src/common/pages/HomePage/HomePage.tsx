import {faLock, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import Header from "../../components/Header/Header";
import Stage1 from "../../components/Stage1/Stage1";
import Stage2 from "../../components/Stage2/Stage2";
import Stage3 from "../../components/Stage3/Stage3";
import Stage4 from "../../components/Stage4/Stage4";
import styles from "./HomePage.module.scss";

type Stages = 1 | 2 | 3 | 4 | 5 | 6;

const HomePage: React.FC = () => {

    const [stage, setStage] = useState<Stages>(1);

    const [countryCode, setCountryCode] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [placeOfBirth, setPlaceOfBirth] = useState<string>("");

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
        setStage(4);
    };

    const handleStage4 = (firstName: string, lastName: string, dateOfBirth: string, placeOfBirth: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setDateOfBirth(dateOfBirth);
        setPlaceOfBirth(placeOfBirth);
        setStage(5);
    };

    const handleStage5 = () => setStage(6);

    const handleStage6 = () => {
        handleComplete();
    };

    const handleComplete = () => {
        const data = {
            countryCode,
            phoneNumber,
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            placeOfBirth,
        };
        alert(`Registration complete!\n${JSON.stringify(data)}`);

        setCountryCode("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        setPlaceOfBirth("");

        setStage(1);
    };

    return (
        <main className={styles.home}>
            <Header stage={stage}/>
            <div className={styles.main}>
                {stage < 4 && <RegistrationHeader/>}
                {stage >= 4 && <ProfileInfoHeader/>}

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
                {stage === 4 && <Stage4 phone={transformPhoneNumber(countryCode, phoneNumber)}
                                        handleComplete={handleStage4}/>
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

const RegistrationHeader = () => (
    <>
        <h1>Registration</h1>
        <p className={styles.desc}>
            Fill in the registration data. It will take a couple of minutes.<br/>
            All you need is a phone number and e-mail
        </p>
    </>
);

const ProfileInfoHeader = () => (
    <>
        <h1>Profile info</h1>
        <p className={styles.desc}>
            Fill in the data for profile. It will take a couple of minutes.
            You only need a passport
        </p>
    </>
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