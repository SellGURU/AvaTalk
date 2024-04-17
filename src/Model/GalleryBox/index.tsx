import { Box } from ".."
import ImageGallery from "react-image-gallery";
import { Button } from "symphony-ui";
interface galleryImage {
    original:string
    thumbnail:string
}

class GalleryBox extends Box{
    
    constructor(protected title:string,protected contents:Array<galleryImage>){
        super(title)
        this.order = 4
        this.typeName = 'GalleryBox'
    }
    public getContents() {
        return this.contents
    }
    public resolveRender(theme: string,mode?:string): JSX.Element {
        return (
            <div className={`${theme}-Profile-Vectors ${this.contents.length>0?'justify-center' :'justify-start'} relative`}>
                {this.contents.length > 0 ?
                    <ImageGallery 
                    items={this.contents} 
                    renderLeftNav={(onClick, disabled) => {
                        return (
                            <>
                                <div  className={`${theme}-back-Button-container-box`} style={{transform: 'translate(30%, -50%)'}} data-mode="gallery">
                                    <Button onClick={onClick} disabled={disabled} theme={`${theme}-back`}>
                                        <div className={`${theme}-back-Button-vector`}></div>
                                    </Button>
                                </div>
                            </>
                        )
                    }} 
                    renderRightNav={(onClick, disabled) => {
                        return (
                            <>
                                <div  className={`${theme}-back-Button-container-box`} style={{transform: 'translate(-30%, -50%)',right:'0%'}}  data-mode="gallery">
                                    <Button onClick={onClick} disabled={disabled}  theme={`${theme}-back`} style={{rotate:'180deg'}}>
                                        <div className={`${theme}-back-Button-vector`}></div>
                                    </Button>
                                </div>
                            </>
                        )
                    }}
                    />                
                :
                    this.resolveAddRender(theme,mode)
                }
            </div>            
        )
    }

    public getRouteAddress(): string {
        return 'gallery'
    }
}

export default GalleryBox
