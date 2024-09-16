interface CheckBoxCostomProps{
    checked:boolean
    label?:string,
    onChange?:() => void
}

const CheckBoxCostom:React.FC<CheckBoxCostomProps> = ({label,checked,onChange}) => {
    return (
        <>
            <div className="flex select-none justify-start items-center gap-2">
                {
                    checked ?
                    <div onClick={onChange} className="w-[24px] flex justify-center items-center h-[24px] rounded-[6px] cursor-pointer hover:border hover:border-[#F3F4F680] bg-primary-color" style={{
                        boxShadow:'4px 4px 20px 0px #6F8CB069 , -6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A'
                    }}>
                       <img src="./Carbon/tick-white.svg" alt="" /> 
                    </div>                    
                    :
                    <div onClick={onChange} className="w-[24px] h-[24px] rounded-[6px] cursor-pointer hover:border hover:border-[#F3F4F680] bg-[#F3F4F6]" style={{
                        boxShadow:'inset 4px 4px 14px 0px #C5D7EE ,inset -4px 4px 9px 0px #FFFFFF99'
                    }}></div>

                }

                <label onClick={onChange} className="text-text-primary select-none text-[14px] cursor-pointer">{label}</label>

            </div>

        </>
    )
}

export default CheckBoxCostom