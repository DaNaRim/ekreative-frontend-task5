import {library} from "@fortawesome/fontawesome-svg-core"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import logo from "../../../assets/icons/logo.png"
import styles from "./Header.module.scss"

library.add(faXmark)

type HeaderProps = {
    stage: 1 | 2 | 3
}

const Header: React.FC<HeaderProps> = ({stage}) => {

    const handleCrossClick = () => {
        alert("Cross clicked")
    }

    return (
        <header className={styles.main_header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo icon"/>
                <h2>Company name</h2>
            </div>
            <div className={styles.stage}>
                <div className={`${styles.stageCircle} ${stage >= 1 ? styles.active : ""}`}></div>
                <div className={`${styles.stageLine} ${stage >= 2 ? styles.active : ""}`}></div>
                <div className={`${styles.stageCircle} ${stage >= 2 ? styles.active : ""}`}></div>
                <div className={`${styles.stageLine} ${stage === 3 ? styles.active : ""}`}></div>
                <div className={`${styles.stageCircle} ${stage === 3 ? styles.active : ""}`}></div>
            </div>
            <button className={styles.cross} onClick={handleCrossClick}>
                <FontAwesomeIcon className={styles.crossIcon} icon={faXmark}/>
            </button>
        </header>
    )
}

export default Header