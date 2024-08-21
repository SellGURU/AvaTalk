import { Button } from "symphony-ui"
import { useState } from "react"
import {ContactStep, CreatePasswordStep, InformationStep} from "./steps"
import { StepController } from "../../../Components"


const OnBoarding = () => {
    const [step ,setStep] = useState(1)
    const resolveStep = () => {
        return (
            <>
                {step == 0 &&
                    <>
                        <CreatePasswordStep></CreatePasswordStep>
                    </>
                }
                {step == 1 &&
                    <>
                        <InformationStep onSubmit={() => {
                            setStep(step+1)
                        }}></InformationStep>
                    </>
                }      
                {step == 2 &&
                    <>
                        <ContactStep onSubmit={() => {
                            setStep(step+1)
                        }}></ContactStep>
                    </>
                }                            
            </>
        )
    }
    return (
        <>
            <div className="w-full min-h-screen py-8 px-4">
                <div className="flex justify-between items-center w-full">
                    <Button onClick={() =>{
                        setStep(step -1)
                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                        <div className="Carbon-back-Button-vector"></div>
                    </Button>
                    <div className="mt-10">
                        <StepController
                            theme="Carbon"
                            steps={4}
                            currentStep={step}
                        ></StepController>                    
                    </div>
                    <div className="text-text-primary font-semibold">Skip</div>
                </div>
                {
                    resolveStep()
                }
            </div>
        </>
    )
}

export default OnBoarding