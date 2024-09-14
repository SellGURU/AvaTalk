/* eslint-disable @typescript-eslint/no-explicit-any */
// import { toast } from "react-toastify";
import { SharingModType ,Location} from "../../Types";
import Box from "../Boxs";
import AdvancedSettings from "./AdvancedSettings";
import { Auth } from "../../Api";
import { boxProvider } from "../../help";
import UserType from "../UserType";

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
    userId?:string
    silent_video_avatar?:string
    talk_video_avater?:string
    address?:string
    referral_code?:string
    gender?:'male'|'female'
    logo?:string
}

// interface Location {
//     lat:number,
//     lng:number
// }

interface Config {
    isShare:boolean
}

class User {
    private defaultBoxs =[
        {
            "text": "",
            "order": 1,
            "title": "About",
            "typeName": "AboutBox",
            "type_name": "AboutBox"
        },
        {
            "order": 2,
            "title": "Social",
            "typeName": "SocialBox",
            "type_name": "SocialBox",
            "socialMedias": []
        },
        {
            "links": [],
            "order": 3,
            "title": "Links",
            "typeName": "LinkBox",
            "type_name": "LinkBox"
        },
        {
            "order": 4,
            "title": "Book with me",
            "contents": [],
            "typeName": "MeetingBox",
            "type_name": "MeetingBox"
        }        
    ]
    public boxs:Array<Box> =this.defaultBoxs.map((item:any) => {
        return boxProvider(item);
    })

    public type_of_account : UserType = new UserType('Pro',new Date())
    public editStatus:boolean = false;
    protected sharingMod:SharingModType = 'Default Mode'
    public advancedSettings:AdvancedSettings = new AdvancedSettings()
    constructor(public information?:Information){}

    public resolveImageUrl() {
        if(this.information?.imageurl!= '' && this.information?.imageurl!= null){
            return this.information?.imageurl
        }
        return `https://ui-avatars.com/api/?name=${this.information?.firstName}+${this.information?.lastName}`
    }
    public updateInformation(information:Information){
        this.information = information
        // toast.success("Done Successfully!")
        this.syncToLocalStorage()
    }
    public updateCustomInformation(information:any){
        console.log(this.information)
        this.information = {
            ...this.information,
            ...information
        }
        console.log(this.information)
        this.syncToLocalStorage()
    }
    public updateAvater(pic:string,silent:string){
        if(this.information?.silent_video_avatar){
            this.information.silent_video_avatar = silent
        }
        if(this.information?.imageurl){
            this.information.imageurl = pic
        }
        this.syncToLocalStorage()
    }
    public resolveBackImageUrl() {
        if(this.information?.banelImage!= '' && this.information?.banelImage!= null){
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
    public setShareMode(mode:SharingModType) {
        this.sharingMod= mode
    }
    public getShareMode() {
        return this.sharingMod
    }
    public isHaveProfileImage() {
        if(this.resolveImageUrl()?.includes('https://ui-avatars.com/api/?name=')){
            return 'Add'
        }else{
            return 'Change'
        }
    }    
    public updateImageurl(base64Image:string|ArrayBuffer|null) {
        Auth.updateProfilePic(base64Image as string)
        if(this.information){
            this.information.imageurl= base64Image as string
            this.syncToLocalStorage()
        }
    }

    public updateBackgroundurl(base64Image:string|ArrayBuffer|null) {
        Auth.updateBackPic(base64Image as string)
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
        Auth.addBox(newBox)
        // toast.success("Done Successfully!")
        // this.syncToLocalStorage()
    }

    public updateBoxs(orderBoxs:Array<string>) {
        this.boxs.forEach((box:Box) => {
            box.setOrder(orderBoxs.indexOf(box.getTypeName())+1)
        })
        Auth.updateBox(this.boxs)
        this.syncToLocalStorage()
    }
    public removeBox(newBox:Box) {
        this.boxs = this.boxs.filter((item) => item.getTypeName() != newBox.getTypeName())
        Auth.deleteBox(newBox.getTypeName())
        // this.syncToLocalStorage()
    }
    public setBox(newBoxs:Array<Box>,config?:Config){
        this.boxs = newBoxs
        if(!config?.isShare){
            this.syncToLocalStorage()
        }
    }
    public resolveLink() {
        return '/#/A/'+this.information?.userId
    }
    public setTypeOfAccount(acount:UserType){
        this.type_of_account = acount
    }

    public setEditStatus(status:boolean){
        this.editStatus = status
    }
} 
export default User