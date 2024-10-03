/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "react-tooltip"
import { Box } from ".."
import { Link } from "react-router-dom";
import { Auth } from "../../Api";
// interface File {
//     name:string
//     url:string
//     order:number
// }
export class File {
    public order:number = -1
    constructor(protected url:string,protected name:string,protected type:string,protected size:string){

    }
    private resolveSvg() {
        console.log("type:",this.type)
        switch(this.type) {
            case 'application/pdf': //pdf
                return 'PdfVector';
            case 'PDF': //pdf
                return 'PdfVector';
            case 'application/psd': //psd
                return 'PhotoShopVector';
            case 'PSD': //psd
                return 'PhotoShopVector';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': //docx
                return 'wordVector';
            case 'application/postscript': //ai
                return 'idVector';
            case 'AI': //ai
                return 'idVector';
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': //pptp
                return 'powerpointVector';
            case 'PPTP': //pptp
                return 'powerpointVector';
            case 'PPT': //pptp
                return 'powerpointVector';
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': //xslx
                return 'ExelVector'
            case 'XLSX': //xslx
                return 'ExelVector'
            case 'XLS': //xslx
                return 'ExelVector'
            case 'XLX': //xslx
                return 'ExelVector'
            case 'application/vnd.ms-excel': //xls
                return 'ExelVector'
            case 'application/x-zip-compressed': //word
                return 'wordVector';
            case 'application/msword'://doc
                return 'wordVector';
            case 'DOC'://doc
                return 'wordVector';
            case 'DOCX'://doc
                return 'wordVector';
        }
    }
    public resolveRender(theme:string,userID:string) {
        return (
            <>
            <div  onClick={() => {
                Auth.addEvent({
                    event_type:"more_info",
                    userid:userID,
                    sub_event_category:'more_info_files'
                })                  
                }}>
                <Link to={this.url} download data-tooltip-id={"link"+this.url} data-tooltip-content={this.url}  className={`${theme}-Profile-BackgroundVectors`}>
                    <div className={`${theme}-ContentCard-CardVector`}>
                        <div className={`${theme}-ContentCard-${this.resolveSvg()}`}></div>
                    </div>
                </Link>  

            </div>
            <Tooltip id={"link"+this.name} />     
            </>
        )
    }    

    public geturl(){
        return this.url
    }

    public getType(){
        return this.type
    }
    public getSize(){
        return this.size
    }

    public getName(){
        return this.name
    }
}
class FileBox extends Box{
    
    constructor(protected title:string,protected contents:Array<File>){
        super(title)
        this.order = 5
        this.type_name = 'FileBox'
    }
    public getContents() {
        return this.contents
    }
    public isShareAble(): boolean {
        if(this.contents.length == 0) {
            return false
        }else{
            return true
        }
    }    
    public resolveRender(theme: string,mode?:string,options?:any): JSX.Element {
        return (
            <div className={`${theme}-Profile-Vectors justify-start relative`}>
                {this.contents.length > 0 ?
                    <>
                        <div className={`${theme}-Profile-Vectors`}>
                            {this.contents.sort((a,b) => a.order -b.order).map((item) => {
                                const newSocal = Object.assign(new File('file','','',''),item)
                                return (
                                    <>
                                        {newSocal.resolveRender(theme,options.userId)}
                                    </>
                                )
                            })}
                        </div>                         
                    </>              
                :
                    this.resolveAddRender(theme,mode)
                }
            </div>            
        )
    }

    public getRouteAddress(): string {
        return 'Files'
    }
}

export default FileBox
