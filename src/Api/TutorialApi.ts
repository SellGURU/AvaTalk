import Api from "./Api.ts";

class TutorialApi extends Api {
    static tutorialVideos() {
        return this.post("/tutorial_videos")
    }
    static checkRating(videoId:string) {
        return this.post("/check_rating",{"video_id": videoId})
    }
}
export  default  TutorialApi