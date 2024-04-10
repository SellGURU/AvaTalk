interface ToturialsBox {
    title:string
    content:string
    position:'bottom' | 'top'
    left?:string
    isLast?:boolean
    theme?:string
    next:() => void
    skip:() => void
}

const ToturialsBox:React.FC<ToturialsBox> = ({next,skip,content,title,position,theme,left,isLast}) => {
    return(
        <>
            <div data-position={position} className={`${theme}-ToturialsBox-container`} style={{left:left+'px'}}>
                <div className='flex justify-between'>
                <div className={`${theme}-ToturialsBox-text`}>{title}</div>
                <div onClick={ isLast?skip:next} className={`${theme}-ToturialsBox-text`}>{isLast?'Let’s Start':'Next'}</div>
                </div>

                <div className='flex justify-between mt-2'>
                <div className={`${theme}-ToturialsBox-content`}>
                  {content}
                </div>
                {!isLast?
                    <div onClick={skip} className={`${theme}-ToturialsBox-text`}>Skip</div>
                :undefined}
                </div>
            </div>          
        </>
    )
}

export default ToturialsBox