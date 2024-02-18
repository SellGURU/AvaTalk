import Box from "../Boxs";

interface Information {
    firstName:string;
    lastName:string;
    phone:string;
    job:string;
    company:string;
    location:Location;
    imageurl:string;
    banelImage:string;
    personlEmail:string;
    workEmail:string;
    workPhone:string
}

interface Location {
    lat:number,
    lng:number
}

interface Config {
    isShare:boolean
}

class User {
    public boxs:Array<Box> = []

    constructor(public information?:Information){}
    public resolveImageUrl() {
        if(this.information?.imageurl!= ''){
            return this.information?.imageurl
        }
        return `https://ui-avatars.com/api/?name=${this.information?.firstName}+${this.information?.lastName}`
    }
    public updateInformation(information:Information){
        this.information = information
        this.syncToLocalStorage()
    }
    public resolveBackImageUrl() {
        if(this.information?.banelImage!= ''){
            return this.information?.banelImage
        }
        return '/Carbon/BackgroundProfileImage.png'       
    }
    public isHaveBackImage() {
        if(this.resolveBackImageUrl() != '/Carbon/BackgroundProfileImage.png'){
            return 'Change'
        }else{
            return 'Add'
        }
    }
    public isHaveProfileImage() {
        if(this.resolveImageUrl()?.includes('https://ui-avatars.com/api/?name=')){
            return 'Add'
        }else{
            return 'Change'
        }
    }    
    public updateImageurl(base64Image:string|ArrayBuffer|null) {
        if(this.information){
            this.information.imageurl= base64Image as string
            this.syncToLocalStorage()
        }
    }

    public updateBackgroundurl(base64Image:string|ArrayBuffer|null) {
        if(this.information){
            this.information.banelImage= base64Image as string
            this.syncToLocalStorage()
        }
    }
    private syncToLocalStorage () {
        localStorage.setItem('authUser',JSON.stringify(this))
    }

    public addBox(newBox:Box) {
        if(this.boxs.filter((item) => item.getTypeName() == newBox.getTypeName()).length > 0){
            this.boxs.splice(this.boxs.findIndex((item) => item.getTypeName() == newBox.getTypeName()),1)
        }
        this.boxs.push(newBox)
        this.syncToLocalStorage()
    }
    public removeBox(newBox:Box) {
        this.boxs = this.boxs.filter((item) => item.getTypeName() != newBox.getTypeName())
        this.syncToLocalStorage()
    }
    public setBox(newBoxs:Array<Box>,config?:Config){
        this.boxs = newBoxs
        if(!config?.isShare){
            this.syncToLocalStorage()
        }
    }
} 
export default User