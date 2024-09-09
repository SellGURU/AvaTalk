import Api from "./Api.ts";

class TutorialApi extends Api {
    static tutorialVideos() {
        return this.post("/tutorial_videos")
    }
    static checkRating(videoId:string) {
        this.post("/check_rating",{  "video_id": videoId}).then(res => {
            console.log(res.data)
        })
    }
}
export  default  TutorialApi