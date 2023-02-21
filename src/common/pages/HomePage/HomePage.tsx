import React, {useState} from "react"
import Header from "../../components/Header/Header"
import Stage1 from "../../components/Stage1/Stage1"

type Stages = 1 | 2 | 3

const HomePage: React.FC = () => {

    const [stage, setStage] = useState<Stages>(1)

    const [countryCode, setCountryCode] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const handleStage1 = (countryCode: string, phoneNumber: string) => {
        setCountryCode(countryCode)
        setPhoneNumber(phoneNumber)
        setStage(2)
    }

    return (
        <main>
            <Header stage={stage}/>
            {stage === 1 && <Stage1 handleComplete={handleStage1}/>}
            {stage === 2 && <h1>Yes</h1>}
        </main>
    )
}

export default HomePage