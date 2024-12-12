/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "react-tooltip"
import { Box } from ".."
import { Link } from "react-router-dom";
// import { Auth } from "../../Api";
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
        switch(this.type) {
            case 'application/pdf': // pdf
            case 'PDF':
                return 'PdfVector';

            case 'application/psd': // psd
            case 'PSD':
            case 'data:application/octet-stream':
                return 'PhotoShopVector';

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // docx
            case 'application/msword': // doc
            case 'application/x-zip-compressed': // word
            case 'DOC':
            case 'DOCX':
            case 'application/rtf': // rtf
            case 'text/plain': // txt
                return 'wordVector';

            case 'application/postscript': // ai
            case 'AI':
                return 'idVector';

            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': // pptx
            case 'application/vnd.ms-powerpoint': // ppt
            case 'PPTP':
            case 'PPT':
                return 'powerpointVector';

            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // xlsx
            case 'application/vnd.ms-excel': // xls
            case 'XLSX':
            case 'XLS':
            case 'XLX':
            case 'application/csv': // csv
            case 'text/csv':
                return 'ExelVector';

            case 'image/jpeg': // jpg/jpeg
            case 'image/jpg':
            case 'image/png': // png
            case 'image/gif': // gif
            case 'image/tiff': // tiff
            case 'image/bmp': // bmp
                return 'ImageVector';

            case 'application/epub+zip': // epub
                return 'EpubVector';

            case 'application/x-7z-compressed': // 7z
            case 'application/zip': // zip
            case 'application/x-rar-compressed': // rar
            case 'application/x-tar': // tar
            case 'application/gzip': // gzip
                return 'ArchiveVector';

            case 'application/json': // json
            case 'application/javascript': // js
            case 'application/xml': // xml
            case 'text/html': // html
            case 'text/javascript': // js
                return 'CodeVector';

            default:
                return 'PhotoShopVector';
        }

    }
    public resolveRender(theme:string,_userID:string) {
        return (
            <>
            <div >
                <Link onClick={() => {
                    // Auth.addEvent({
                    //     event_type:"more_info",
                    //     userid:_userID,
                    //     sub_event_category:'more_info_files'
                    // })             
                }} to={this.url} download data-tooltip-id={"link"+this.url} data-tooltip-content={this.url}  className={`${theme}-Profile-BackgroundVectors`}>
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
    
    constructor(protected title:string,protected contents:Array<File>,protected type?:'upload'|'save'){
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
