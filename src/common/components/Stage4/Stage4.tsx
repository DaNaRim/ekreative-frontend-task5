import {faArrowRight, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {CitiMap, getCitiesData} from "../../utils/cityData";
import {Data, MyComboBox} from "../form/MyComboBox/MyComboBox";
import styles from "./Stage4.module.scss";

type Stage4Fields = {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    placeOfBirth: string,
    termsOfUseAgreement: boolean,
}

type Stage4Props = {
    phone: string
    handleComplete: (firstName: string, lastName: string, dateOfBirth: string, placeOfBirth: string) => void
}

const Stage4 = ({phone, handleComplete}: Stage4Props) => {

    const {register, control, handleSubmit, formState: {errors}} = useForm<Stage4Fields>();

    const [cities, setCities] = useState<CitiMap>({});

    useEffect(() => {
        getCitiesData().then((data) => setCities(data));
    }, []);

    const transformedCities = useMemo(() => {
        const result: Data[] = [];
        for (const country in cities) {
            if (cities.hasOwnProperty(country)) {
                cities[country].forEach((city) =>
                    result.push({
                        id: `${city}, ${country}`,
                        value: `${city}, ${country}`,
                        name: `${city}, ${country}`,
                    }));
            }
        }
        return result;
    }, [cities]);

    const handleStage4 = (data: Stage4Fields) => {
        handleComplete(data.firstName, data.lastName, data.dateOfBirth, data.placeOfBirth);
    };

    return (
        <form className={styles.stage4} onSubmit={handleSubmit(handleStage4)}>
            <div className={styles.termsOfUseAgreement}>
                <div className={styles.termsWrapper}>
                    <input type="checkbox"
                           id="termsOfUseAgreement"
                           {...register("termsOfUseAgreement", {required: true})}/>
                    <label htmlFor="termsOfUseAgreement">
                        <FontAwesomeIcon className={styles.checkSign} icon={faCheck}/>
                    </label>
                    <p>
                        I agree with <a href="#">Terms of use</a>
                    </p>
                </div>
                {errors.termsOfUseAgreement && <span className={styles.error}>You must agree with Terms of use</span>}
            </div>
            <fieldset>
                <h2>Personal data</h2>
                <p className={styles.desc}>Specify exactly as in your passport</p>
                <p>
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" {...register("firstName", {required: true})}/>
                    {errors.firstName?.type === "required" &&
                      <span className={styles.error}>First name is required</span>}
                </p>
                <p>
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" id="lastName" {...register("lastName", {required: true})}/>
                    {errors.lastName?.type === "required" && (
                        <span className={styles.error}>Last name is required</span>
                    )}
                </p>
                <div className={styles.doubleInputWrapper}>
                    <p>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input type="date" id="dateOfBirth" {...register("dateOfBirth", {required: true})}/>
                        {errors.dateOfBirth?.type === "required" && (
                            <span className={styles.error}>Date of birth is required</span>
                        )}
                    </p>
                    <p>
                        <Controller
                            rules={{required: true}}
                            name="placeOfBirth"
                            control={control}
                            render={({field}) => <MyComboBox {...field}
                                                             data={transformedCities}
                                                             className={styles.placeOfBirth}
                                                             label="Place of birth"
                                                             isDisplayName={false}/>}
                        />
                        {errors.placeOfBirth?.type === "required" && (
                            <span className={styles.error}>Place of birth is required</span>
                        )}
                    </p>
                </div>
            </fieldset>
            <div className={styles.phoneBox}>
                <h2>{phone}</h2>
                <div className={styles.confirmedWrapper}>
                    <FontAwesomeIcon className={styles.checkSign} icon={faCheck}/>
                    <p>Your ITIN</p>
                </div>
            </div>
            <button type="submit" className={styles.submitButton}>
                <span>Go next</span>
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon}/>
            </button>
        </form>
    );
};

export default Stage4;