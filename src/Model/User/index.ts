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
    constructor(protected information?:Information){
        
    } 
}
export default User