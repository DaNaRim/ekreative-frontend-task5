import {library} from "@fortawesome/fontawesome-svg-core"
import {faLock, faXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {Data, MyComboBox} from "../form/MyComboBox"
// import MyComboBox, {Data} from "../form/MyComboBox"
import styles from "./Stage1.module.scss"

library.add(faXmark, faLock)

type Stage1Fields = {
    countryCode: string,
    phoneNumber: string,
}

const Stage1 = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<Stage1Fields>()

    const [alertOpen, setAlertOpen] = useState<boolean>(true)

    const closeAlert = () => {
        setAlertOpen(false)
    }

    const transformedCountryCodes = countryCodes.map((code) => ({
        id: code.id,
        name: code.country,
        value: `+${code.code}`,
    } as Data))

    const handleStage1 = (data: Stage1Fields) => {
        alert(JSON.stringify(data))
    }

    return (
        <section className={styles.stage1}>
            <div className={styles.mainBlock}>
                <h1>Registration</h1>
                <div className={styles.desc}>
                    Fill in the registration data. It will take a couple of minutes.<br/>
                    All you need is a phone number and e-mail
                </div>
                {alertOpen && <Alert closeAlert={closeAlert}/>}
                <form onSubmit={handleSubmit(handleStage1)}>
                    <title>Phone number</title>
                    <div className={styles.phoneWrapper}>
                        <Controller
                            name="countryCode"
                            control={control}
                            defaultValue={String(countryCodes[0].code)}
                            render={({field}) => <MyComboBox {...field}
                                                             data={transformedCountryCodes}
                                                             className={styles.countryCode}/>}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Next</button>
                </form>
            </div>
        </section>
    )
}

export default Stage1

interface AlertProps {closeAlert: () => void}

const Alert = ({closeAlert}: AlertProps) => (
    <div className={styles.alert}>
        <FontAwesomeIcon className={styles.lockIcon} icon={faLock}/>
        <p>
            We take privacy issues seriously. You can be sure that your personal data is securely protected.
        </p>
        <div className={styles.cross} role="button" tabIndex={0} onClick={closeAlert}>
            <FontAwesomeIcon className={styles.crossIcon} icon={faXmark}/>
        </div>
    </div>
)

type CountryCode = {
    country: string,
    id: string,
    code: number,
}

const countryCodes: CountryCode[] = [
    {country: "Afghanistan", id: "af", code: 93},
    {country: "Albania", id: "al", code: 355},
    {country: "Algeria", id: "dz", code: 213},
    {country: "American Samoa", id: "as", code: 1684},
    {country: "Andorra", id: "ad", code: 376},
    {country: "Angola", id: "ao", code: 244},
    {country: "Anguilla", id: "ai", code: 1264},
    {country: "Antigua and Barbuda", id: "ag", code: 1268},
    {country: "Argentina", id: "ar", code: 54},
    {country: "Armenia", id: "am", code: 374},
    {country: "Aruba", id: "aw", code: 297},
    {country: "Australia", id: "au", code: 61},
    {country: "Austria", id: "at", code: 43},
    {country: "Azerbaijan", id: "az", code: 994},
    {country: "Bahamas", id: "bs", code: 1242},
    {country: "Bahrain", id: "bh", code: 973},
    {country: "Bangladesh", id: "bd", code: 880},
    {country: "Barbados", id: "bb", code: 1246},
    {country: "Belarus", id: "by", code: 375},
    {country: "Belgium", id: "be", code: 32},
    {country: "Belize", id: "bz", code: 501},
    {country: "Benin", id: "bj", code: 229},
    {country: "Bermuda", id: "bm", code: 1441},
    {country: "Bhutan", id: "bt", code: 975},
    {country: "Bolivia", id: "bo", code: 591},
    {country: "Bosnia and Herzegovina", id: "ba", code: 387},
    {country: "Botswana", id: "bw", code: 267},
    {country: "Brazil", id: "br", code: 55},
    {country: "British Indian Ocean Territory", id: "io", code: 246},
    {country: "British Virgin Islands", id: "vg", code: 1284},
    {country: "Brunei", id: "bn", code: 673},
    {country: "Bulgaria", id: "bg", code: 359},
    {country: "Burkina Faso", id: "bf", code: 226},
    {country: "Burundi", id: "bi", code: 257},
    {country: "Cambodia", id: "kh", code: 855},
    {country: "Cameroon", id: "cm", code: 237},
    {country: "Canada", id: "ca", code: 1},
    {country: "Cape Verde", id: "cv", code: 238},
    {country: "Caribbean Netherlands", id: "bq", code: 599},
    {country: "Cayman Islands", id: "ky", code: 1345},
    {country: "Central African Republic", id: "cf", code: 236},
    {country: "Chad", id: "td", code: 235},
    {country: "Chile", id: "cl", code: 56},
    {country: "China", id: "cn", code: 86},
    {country: "Colombia", id: "co", code: 57},
    {country: "Comoros", id: "km", code: 269},
    {country: "Congo (DRC)", id: "cd", code: 243},
    {country: "Congo (Republic)", id: "cg", code: 242},
    {country: "Cook Islands", id: "ck", code: 682},
    {country: "Costa Rica", id: "cr", code: 506},
    {country: "Côte d’Ivoire", id: "ci", code: 225},
    {country: "Croatia", id: "hr", code: 385},
    {country: "Cuba", id: "cu", code: 53},
    {country: "Curaçao", id: "cw", code: 599},
    {country: "Cyprus", id: "cy", code: 357},
    {country: "Czech Republic", id: "cz", code: 420},
    {country: "Denmark", id: "dk", code: 45},
    {country: "Djibouti", id: "dj", code: 253},
    {country: "Dominica", id: "dm", code: 1767},
    {country: "Dominican Republic", id: "do", code: 1},
    {country: "Ecuador", id: "ec", code: 593},
    {country: "Egypt", id: "eg", code: 20},
    {country: "El Salvador", id: "sv", code: 503},
    {country: "Equatorial Guinea", id: "gq", code: 240},
    {country: "Eritrea", id: "er", code: 291},
    {country: "Estonia", id: "ee", code: 372},
    {country: "Ethiopia", id: "et", code: 251},
    {country: "Falkland Islands", id: "fk", code: 500},
    {country: "Faroe Islands", id: "fo", code: 298},
    {country: "Fiji", id: "fj", code: 679},
    {country: "Finland", id: "fi", code: 358},
    {country: "France", id: "fr", code: 33},
    {country: "French Guiana", id: "gf", code: 594},
    {country: "French Polynesia", id: "pf", code: 689},
    {country: "Gabon", id: "ga", code: 241},
    {country: "Gambia", id: "gm", code: 220},
    {country: "Georgia", id: "ge", code: 995},
    {country: "Germany", id: "de", code: 49},
    {country: "Ghana", id: "gh", code: 233},
    {country: "Gibraltar", id: "gi", code: 350},
    {country: "Greece", id: "gr", code: 30},
    {country: "Greenland", id: "gl", code: 299},
    {country: "Grenada", id: "gd", code: 1473},
    {country: "Guadeloupe", id: "gp", code: 590},
    {country: "Guam", id: "gu", code: 1671},
    {country: "Guatemala", id: "gt", code: 502},
    {country: "Guinea", id: "gn", code: 224},
    {country: "Guinea-Bissau", id: "gw", code: 245},
    {country: "Guyana", id: "gy", code: 592},
    {country: "Haiti", id: "ht", code: 509},
    {country: "Honduras", id: "hn", code: 504},
    {country: "Hong Kong", id: "hk", code: 852},
    {country: "Hungary", id: "hu", code: 36},
    {country: "Iceland", id: "is", code: 354},
    {country: "India", id: "in", code: 91},
    {country: "Indonesia", id: "id", code: 62},
    {country: "Iran", id: "ir", code: 98},
    {country: "Iraq", id: "iq", code: 964},
    {country: "Ireland", id: "ie", code: 353},
    {country: "Israel", id: "il", code: 972},
    {country: "Italy", id: "it", code: 39},
    {country: "Jamaica", id: "jm", code: 1876},
    {country: "Japan", id: "jp", code: 81},
    {country: "Jordan", id: "jo", code: 962},
    {country: "Kazakhstan", id: "kz", code: 7},
    {country: "Kenya", id: "ke", code: 254},
    {country: "Kiribati", id: "ki", code: 686},
    {country: "Kuwait", id: "kw", code: 965},
    {country: "Kyrgyzstan", id: "kg", code: 996},
    {country: "Laos", id: "la", code: 856},
    {country: "Latvia", id: "lv", code: 371},
    {country: "Lebanon", id: "lb", code: 961},
    {country: "Lesotho", id: "ls", code: 266},
    {country: "Liberia", id: "lr", code: 231},
    {country: "Libya", id: "ly", code: 218},
    {country: "Liechtenstein", id: "li", code: 423},
    {country: "Lithuania", id: "lt", code: 370},
    {country: "Luxembourg", id: "lu", code: 352},
    {country: "Macau", id: "mo", code: 853},
    {country: "Macedonia", id: "mk", code: 389},
    {country: "Madagascar", id: "mg", code: 261},
    {country: "Malawi", id: "mw", code: 265},
    {country: "Malaysia", id: "my", code: 60},
    {country: "Maldives", id: "mv", code: 960},
    {country: "Mali", id: "ml", code: 223},
    {country: "Malta", id: "mt", code: 356},
    {country: "Marshall Islands", id: "mh", code: 692},
    {country: "Martinique", id: "mq", code: 596},
    {country: "Mauritania", id: "mr", code: 222},
    {country: "Mauritius", id: "mu", code: 230},
    {country: "Mexico", id: "mx", code: 52},
    {country: "Micronesia", id: "fm", code: 691},
    {country: "Moldova", id: "md", code: 373},
    {country: "Monaco", id: "mc", code: 377},
    {country: "Mongolia", id: "mn", code: 976},
    {country: "Montenegro", id: "me", code: 382},
    {country: "Montserrat", id: "ms", code: 1664},
    {country: "Morocco", id: "ma", code: 212},
    {country: "Mozambique", id: "mz", code: 258},
    {country: "Myanmar", id: "mm", code: 95},
    {country: "Namibia", id: "na", code: 264},
    {country: "Nauru", id: "nr", code: 674},
    {country: "Nepal", id: "np", code: 977},
    {country: "Netherlands", id: "nl", code: 31},
    {country: "New Caledonia", id: "nc", code: 687},
    {country: "New Zealand", id: "nz", code: 64},
    {country: "Nicaragua", id: "ni", code: 505},
    {country: "Niger", id: "ne", code: 227},
    {country: "Nigeria", id: "ng", code: 234},
    {country: "Niue", id: "nu", code: 683},
    {country: "Norfolk Island", id: "nf", code: 672},
    {country: "North Korea", id: "kp", code: 850},
    {country: "Northern Mariana Islands", id: "mp", code: 1670},
    {country: "Norway", id: "no", code: 47},
    {country: "Oman", id: "om", code: 968},
    {country: "Pakistan", id: "pk", code: 92},
    {country: "Palau", id: "pw", code: 680},
    {country: "Palestine", id: "ps", code: 970},
    {country: "Panama", id: "pa", code: 507},
    {country: "Papua New Guinea", id: "pg", code: 675},
    {country: "Paraguay", id: "py", code: 595},
    {country: "Peru", id: "pe", code: 51},
    {country: "Philippines", id: "ph", code: 63},
    {country: "Poland", id: "pl", code: 48},
    {country: "Portugal", id: "pt", code: 351},
    {country: "Puerto Rico", id: "pr", code: 1},
    {country: "Qatar", id: "qa", code: 974},
    {country: "Réunion", id: "re", code: 262},
    {country: "Romania", id: "ro", code: 40},
    {country: "Russia", id: "ru", code: 7},
    {country: "Rwanda", id: "rw", code: 250},
    {country: "Saint Barthélemy", id: "bl", code: 590},
    {country: "Saint Helena", id: "sh", code: 290},
    {country: "Saint Kitts and Nevis", id: "kn", code: 1869},
    {country: "Saint Lucia", id: "lc", code: 1758},
    {country: "Saint Martin", id: "mf", code: 590},
    {country: "Saint Pierre and Miquelon", id: "pm", code: 508},
    {country: "Saint Vincent and the Grenadines", id: "vc", code: 1784},
    {country: "Samoa", id: "ws", code: 685},
    {country: "San Marino", id: "sm", code: 378},
    {country: "São Tomé and Príncipe", id: "st", code: 239},
    {country: "Saudi Arabia", id: "sa", code: 966},
    {country: "Senegal", id: "sn", code: 221},
    {country: "Serbia", id: "rs", code: 381},
    {country: "Seychelles", id: "sc", code: 248},
    {country: "Sierra Leone", id: "sl", code: 232},
    {country: "Singapore", id: "sg", code: 65},
    {country: "Sint Maarten", id: "sx", code: 1721},
    {country: "Slovakia", id: "sk", code: 421},
    {country: "Slovenia", id: "si", code: 386},
    {country: "Solomon Islands", id: "sb", code: 677},
    {country: "Somalia", id: "so", code: 252},
    {country: "South Africa", id: "za", code: 27},
    {country: "South Korea", id: "kr", code: 82},
    {country: "South Sudan", id: "ss", code: 211},
    {country: "Spain", id: "es", code: 34},
    {country: "Sri Lanka", id: "lk", code: 94},
    {country: "Sudan", id: "sd", code: 249},
    {country: "Suriname", id: "sr", code: 597},
    {country: "Swaziland", id: "sz", code: 268},
    {country: "Sweden", id: "se", code: 46},
    {country: "Switzerland", id: "ch", code: 41},
    {country: "Syria", id: "sy", code: 963},
    {country: "Taiwan", id: "tw", code: 886},
    {country: "Tajikistan", id: "tj", code: 992},
    {country: "Tanzania", id: "tz", code: 255},
    {country: "Thailand", id: "th", code: 66},
    {country: "Timor-Leste", id: "tl", code: 670},
    {country: "Togo", id: "tg", code: 228},
    {country: "Tokelau", id: "tk", code: 690},
    {country: "Tonga", id: "to", code: 676},
    {country: "Trinidad and Tobago", id: "tt", code: 1868},
    {country: "Tunisia", id: "tn", code: 216},
    {country: "Turkey", id: "tr", code: 90},
    {country: "Turkmenistan", id: "tm", code: 993},
    {country: "Turks and Caicos Islands", id: "tc", code: 1649},
    {country: "Tuvalu", id: "tv", code: 688},
    {country: "U.S. Virgin Islands", id: "vi", code: 1340},
    {country: "Uganda", id: "ug", code: 256},
    {country: "Ukraine", id: "ua", code: 380},
    {country: "United Arab Emirates", id: "ae", code: 971},
    {country: "United Kingdom", id: "gb", code: 44},
    {country: "United States", id: "us", code: 1},
    {country: "Uruguay", id: "uy", code: 598},
    {country: "Uzbekistan", id: "uz", code: 998},
    {country: "Vanuatu", id: "vu", code: 678},
    {country: "Vatican City", id: "va", code: 39},
    {country: "Venezuela", id: "ve", code: 58},
    {country: "Vietnam", id: "vn", code: 84},
    {country: "Wallis and Futuna", id: "wf", code: 681},
    {country: "Yemen", id: "ye", code: 967},
    {country: "Zambia", id: "zm", code: 260},
    {country: "Zimbabwe", id: "zw", code: 263},
]