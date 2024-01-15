/* eslint-disable @typescript-eslint/no-explicit-any */
// import { FileUploadr } from "symphony-ui"

import { useState } from "react"
import { FileUploadr } from "../../Components"

const CreateAccount = () => {
    const [files,setFiles] = useState<Array<any>>([]);
    return (
        <>
            <div className="w-full px-4 h-max">
                <FileUploadr uploades={(res) => {
                    setFiles(res)
                }} theme="Carbon"></FileUploadr>
            </div>
        </>
    )
}

export default CreateAccount