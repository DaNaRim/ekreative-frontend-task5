import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../../assets/icons/logo.png";
import styles from "./Header.module.scss";

type HeaderProps = {
    stage: 1 | 2 | 3 | 4 | 5 | 6
}

const Header: React.FC<HeaderProps> = ({stage}) => {

    const isSecondDotActive = stage >= 2 && stage !== 4;
    const isThirdDotActive = stage >= 3 && stage !== 4 && stage !== 5;

    const handleCrossClick = () => alert("Cross clicked");

    return (
        <header className={styles.main_header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo icon"/>
                <h2>Company name</h2>
            </div>
            <div className={styles.stage}>
                <div className={`${styles.stageCircle} ${styles.active}`}></div>
                <div className={`${styles.stageLine} ${isSecondDotActive ? styles.active : ""}`}></div>
                <div className={`${styles.stageCircle} ${isSecondDotActive ? styles.active : ""}`}></div>
                <div className={`${styles.stageLine} ${isThirdDotActive ? styles.active : ""}`}></div>
                <div className={`${styles.stageCircle} ${isThirdDotActive ? styles.active : ""}`}></div>
            </div>
            <button className={styles.cross} onClick={handleCrossClick}>
                <FontAwesomeIcon className={styles.crossIcon} icon={faXmark}/>
            </button>
        </header>
    );
};

export default Header;