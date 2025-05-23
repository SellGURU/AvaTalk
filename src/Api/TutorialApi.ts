import Api from "./Api.ts";

class TutorialApi extends Api {
    static tutorialVideos() {
        return this.post("/tutorial_videos",{},{noPending:true})
    }
    static checkRating(videoId:string) {
        return this.post("/check_rating",{"video_id": videoId},{noPending:true})
    }
    static sendRate(videoId:string,rate:string) {
        return this.post("/add_rating",{"video_id": videoId,"rate":rate},{noPending:true})
    }
    static view(videoId:string,userId:string) {
        return this.post('/add_event',{
            event_type:'view_video',
            sub_event_category:videoId,
            userid:userId
        },{noPending:true})
    }    
}
export  default  TutorialApi