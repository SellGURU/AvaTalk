import { Tooltip } from "react-tooltip"
import { Box } from ".."
import { Link } from "react-router-dom";
// interface File {
//     name:string
//     url:string
//     order:number
// }
export class File {
    public order:number = -1
    constructor(protected url:string,protected name:string,protected type:string){

    } 
    private resolveSvg() {
        console.log(this.type)
        switch(this.type) {
            case 'application/pdf':
                return 'PdfVector';
            case 'application/psd':
                return 'PhotoShopVector';
            case 'application/doc':
                return 'wordVector';
            case 'application/ai':
                return 'idVector';
            case 'application/pptx':
                return 'powerpointVector';
            case 'application/xls':
                return 'ExelVector'
            case 'application/x-zip-compressed':
                return 'wordVector';
            default :
                return 'PhotoShopVector'
        }
    }
    public resolveRender(theme:string) {
        return (
            <>
            <Link to={this.url} download data-tooltip-id={"link"+this.url} data-tooltip-content={this.url}  className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-${this.resolveSvg()}`}></div>
                </div>
            </Link>  
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
    public resolveRender(theme: string,mode?:string): JSX.Element {
        return (
            <div className={`${theme}-Profile-Vectors justify-start relative`}>
                {this.contents.length > 0 ?
                    <>
                        <div className={`${theme}-Profile-Vectors`}>
                            {this.contents.sort((a,b) => a.order -b.order).map((item) => {
                                const newSocal = Object.assign(new File('file','',''),item)
                                return (
                                    <>
                                        {newSocal.resolveRender(theme)}
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
