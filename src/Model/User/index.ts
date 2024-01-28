interface Information {
    firstName:string;
    lastName:string;
    phone:string;
    job:string;
    company:string;
    location:Location;
    imageurl:string;
    banelImage:string;
}

interface Location {
    lat:number,
    lng:number
}

class User {
    constructor(public information?:Information){}
    public resolveImageUrl() {
        if(this.information?.imageurl!= ''){
            return this.information?.imageurl
        }
        return `https://ui-avatars.com/api/?name=${this.information?.firstName}+${this.information?.lastName}`
    }
} 
export default User