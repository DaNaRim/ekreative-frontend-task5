import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {CitiMap, getCitiesData} from "../../utils/cityData";
import {Data, MyComboBox} from "../form/MyComboBox/MyComboBox";
import styles from "./Stage6.module.scss";

type Stage6Fields = {
    address: string,
    city: string,
    country: string,
    zipCode: string,
    optionalAddress: string,
}

type Stage6Props = {
    handleComplete: (address: string, city: string, country: string, zipCode: string, optionalAddress: string) => void
}

//FIXME: if country is picked and then city is picked, country updated, but in optionList active value is not updated

const Stage6 = ({handleComplete}: Stage6Props) => {

    const {register, control, handleSubmit, getValues, setValue, formState: {errors}} = useForm<Stage6Fields>();

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
                        value: `${city}`,
                        name: `${country}`,
                    }));
            }
        }
        return result;
    }, [cities]);

    const transformedCountries = useMemo(() => {
        const result: Data[] = [];
        Object.keys(cities).forEach((country) =>
            result.push({
                id: `${country}`,
                value: `${country}`,
                name: `${country}`,
            }));
        return result;
    }, [cities]);

    const onCityChange = (name: string) => setValue("country", name);

    const onCountryChange = (name: string, value: string) => {
        //Is current city in new country?
        const currentCity = getValues("city");

        if (currentCity && !cities[value].includes(currentCity)) {
            setValue("city", "");
        }
    };

    const handleStage4 = (data: Stage6Fields) => {
        handleComplete(data.address, data.city, data.country, data.zipCode, data.optionalAddress);
    };

    return (
        <form className={styles.stage6} onSubmit={handleSubmit(handleStage4)}>
            <fieldset>
                <h2>Delivery address</h2>
                <p className={styles.desc}>Used for shipping orders</p>

                <p className={styles.field}>
                    <label htmlFor="address">Address</label>
                    <input type="text"
                           id="address"
                           {...register("address", {required: true})}
                           placeholder="47 W 13th St"/>
                    {errors.address?.type === "required" && (
                        <span className={styles.error}>Address is required</span>
                    )}
                </p>
                <div className={styles.field}>
                    <Controller
                        rules={{required: true}}
                        defaultValue={""} //Without this, automatic select not working
                        name="city"
                        control={control}
                        render={({field}) => <MyComboBox {...field}
                                                         data={transformedCities}
                                                         className={styles.city}
                                                         label="City"
                                                         extraOnChange={onCityChange}/>}
                    />
                    {errors.city?.type === "required" && (
                        <span className={styles.error}>City is required</span>
                    )}
                </div>
                <div className={styles.doubleInputWrapper}>
                    <div className={styles.field}>
                        <Controller
                            rules={{required: true}}
                            defaultValue={""} //Without this, automatic select not working
                            name="country"
                            control={control}
                            render={({field}) => <MyComboBox {...field}
                                                             data={transformedCountries}
                                                             className={styles.country}
                                                             label="Country"
                                                             extraOnChange={onCountryChange}
                                                             isDisplayName={false}/>}
                        />

                        {errors.country?.type === "required" && (
                            <span className={styles.error}>Country is required</span>
                        )}
                    </div>
                    <p className={styles.field}>
                        <label htmlFor="zipCode">Zip code</label>
                        <input type="text" id="zipCode" {...register("zipCode", {required: true})} placeholder="10011"/>
                        {errors.zipCode?.type === "required" && (
                            <span className={styles.error}>Zip code is required</span>
                        )}
                    </p>
                </div>
                <p className={styles.field}>
                    <label htmlFor="optionalAddress">Optional</label>
                    <input type="text" id="optionalAddress" {...register("optionalAddress")}/>
                </p>
            </fieldset>
            <button type="submit" className={styles.submitButton}>
                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon}/>
                <span>Save</span>
            </button>
        </form>
    );
};

export default Stage6;