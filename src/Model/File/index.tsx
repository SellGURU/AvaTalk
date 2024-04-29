import { Tooltip } from "react-tooltip"
import { Box } from ".."
// interface File {
//     name:string
//     url:string
//     order:number
// }
export class File {
    public order:number = -1
    constructor(protected url:string,protected name:string){

    } 
    public resolveRender(theme:string) {
        return (
            <>
            <div data-tooltip-id={"link"+this.url} data-tooltip-content={this.url} onClick={() => window.open(this.url)} className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-PdfVector`}></div>
                </div>
            </div>  
            <Tooltip id={"link"+this.name} />     
            </>
        )
    }    

    public geturl(){
        return this.url
    }

    public getName(){
        return this.name
    }
}
class FileBox extends Box{
    
    constructor(protected title:string,protected contents:Array<File>){
        super(title)
        this.order = 5
        this.typeName = 'FileBox'
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
                                const newSocal = Object.assign(new File('file',''),item)
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
