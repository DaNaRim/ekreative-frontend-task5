import React, {useState} from "react"
import Header from "../../components/Header/Header"
import Stage1 from "../../components/Stage1/Stage1"

type Stages = 1 | 2 | 3

const HomePage: React.FC = () => {

    const [stage, setStage] = useState<Stages>(1)

    return (
        <main>
            <Header stage={stage}/>
            {stage === 1 && <Stage1/>}
        </main>
    )
}

export default HomePage