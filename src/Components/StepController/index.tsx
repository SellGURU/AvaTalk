type StepControllerProps = {
    theme?:string
    currentStep: number
    steps:number
}

const StepController: React.FC<StepControllerProps> = ({steps,currentStep,theme}) => {
    return (
        <>
            <div className={`${theme}-StepController-container`}>
                {Array.from(Array(steps), (_e,index:number) => {
                    return (
                        <div key={index} className={`${theme}-StepController-step ${currentStep == index+1 ? `${theme}-StepController-step-active `: '' }`}></div>
                    )
                })}

            </div>        
        </>
    )
}

export default StepController