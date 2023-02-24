import {faArrowRight, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useMemo, useState} from "react";
import styles from "./Stage5.module.scss";

type Socials = {
    [key: string]: string | undefined;
    facebook?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string,
    telegram?: string,
}

type Stage4Props = {
    handleComplete: (socials: Socials) => void
}

const MIN_SOCIALS_TO_DISPLAY = 2;

const Stage5 = ({handleComplete}: Stage4Props) => {

    const socialsList: Socials = useMemo(() => ({
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        telegram: "",
    }), []);

    const [socials, setSocials] = useState<Socials>({
        facebook: "",
        instagram: "",
    });

    const handleSocialChange = (social: keyof Socials, value: string) => {
        setSocials({...socials, [social]: value});
    };

    const handleSocialTypeChange = (oldType: keyof Socials, newType: keyof Socials, value: string) => {

        const socialsBeforeOldType = Object.keys(socials)
                                           .slice(0, Object.keys(socials).indexOf(oldType as string))
                                           .reduce((obj, key) => {
                                               obj[key] = socials[key];
                                               return obj;
                                           }, {} as Socials);
        const socialsAfterOldType = Object.keys(socials)
                                          .slice(Object.keys(socials).indexOf(oldType as string) + 1)
                                          .reduce((obj, key) => {
                                              obj[key] = socials[key];
                                              return obj;
                                          }, {} as Socials);
        setSocials({
            ...socialsBeforeOldType,
            [newType]: value,
            ...socialsAfterOldType,
        });
    };

    const getAvailableSocials = () =>
        Object.keys(socialsList).filter(key => !socials.hasOwnProperty(key))
              .reduce((obj, key) => {
                  obj[key] = socials[key];
                  return obj;
              }, {} as Socials);

    const handleAddSocial = () => {
        const availableSocial = Object.keys(socialsList).filter(key => !socials.hasOwnProperty(key))[0];
        setSocials({...socials, [availableSocial]: ""});
    };

    const handleRemoveSocial = (social: keyof Socials) => {
        const oldSocials = socials;
        delete oldSocials[social];

        setSocials({...oldSocials});
    };

    const handleStage4 = () => {
        const preparedSocials = {...socials};

        //delete socials with empty values
        Object.keys(preparedSocials).forEach((social) => {
            if (!preparedSocials[social]) {
                delete preparedSocials[social];
            }
        });
        handleComplete(preparedSocials);
    };

    return (
        <form className={styles.stage5} onSubmit={handleStage4}>
            <fieldset>
                <h2>Social network</h2>
                <p className={styles.desc}>Indicate the desired communication method</p>

                <div className={styles.socials}>
                    {Object.keys(socials).map((social) => (
                        <div key={social} className={styles.socialWrapper}>
                            <SocialInput className={
                                Object.keys(socials).length > MIN_SOCIALS_TO_DISPLAY
                                    ? styles.removableSocial
                                    : ""}
                                         socials={getAvailableSocials()}
                                         social={social}
                                         value={socials[social] as string}
                                         onSocialTypeChange={handleSocialTypeChange}
                                         onSocialValueChange={handleSocialChange}/>
                            {Object.keys(socials).length > MIN_SOCIALS_TO_DISPLAY && (
                                <button onClick={() => handleRemoveSocial(social)}>
                                    <FontAwesomeIcon icon={faXmark} className={styles.crossIcon}/>
                                </button>
                            )}
                        </div>
                    ))}
                    {Object.keys(getAvailableSocials()).length > 0 && (
                        <button type="button" className={styles.addMoreButton} onClick={handleAddSocial}>
                            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
                            <span>Add more</span>
                        </button>
                    )}
                </div>
            </fieldset>

            <button type="submit" className={styles.submitButton}>
                <span>Go next</span>
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon}/>
            </button>
        </form>
    );
};

export default Stage5;


type SocialInputProps = {
    className?: string;
    socials: Socials;
    social: keyof Socials;
    value: string;
    onSocialTypeChange: (oldType: keyof Socials, newType: keyof Socials, value: string) => void;
    onSocialValueChange: (social: keyof Socials, value: string) => void;
};

const SocialInput = ({
                         socials,
                         social,
                         value,
                         onSocialTypeChange,
                         onSocialValueChange,
                         className,
                     }: SocialInputProps) => {

    const handleSocialTypeChange = (type: keyof Socials) => onSocialTypeChange(social, type, value);

    const handleSocialValueChange = (value: string) => onSocialValueChange(social, value);

    const getSocialOptions = () => {
        const socialOptions = Object.keys(socials);
        socialOptions.push(social as string);
        return socialOptions;
    };

    return (
        <>
            <select value={social}
                    onChange={e => handleSocialTypeChange(e.target.value)}
                    className={`${styles.selectSocial} ${className}`}>
                {getSocialOptions().map((social) => (
                    <option key={Math.random()} value={social}>
                        {social}
                    </option>
                ))}
            </select>
            <input className={`${styles.inputSocial} ${className}`}
                   type="text"
                   value={value}
                   placeholder="Link to your profile"
                   onChange={e => handleSocialValueChange(e.target.value)}
            />
        </>
    );
};
