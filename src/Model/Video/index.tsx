/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "../index.ts";
import { Auth } from "../../Api";
import { Tooltip } from "react-tooltip";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Button } from "symphony-ui";

class Video {
  public order: number = -1;
  private id:string = ''
  constructor(protected url: string, protected name: string) {
    this.id = `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`    
  }
  public getid() {
      return this.id
  }
  public resolveRender(_theme: string, userID: string) {
    console.log("this.geturl() mkmk", this.geturlEmbeded());

    return (
      <div className={`w-full`}>
        <div
          data-tooltip-id={"link" + this.geturlEmbeded()}
          data-tooltip-contents={this.geturlEmbeded()}
          onClick={() => this.handleMoreInfoClick(userID)}
        >
          <iframe
            className=" !rounded-xl"
            width="100%"
            height="315"
            src={this.geturlEmbeded()}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Tooltip id={"link" + this.geturlEmbeded()} />
      </div>
    );
  }

  private handleMoreInfoClick(userID: string) {
    Auth.addEvent({
      event_type: "more_info",
      userid: userID,
      sub_event_category: "more_info_links",
    });
  }

  public geturl() {
    return this.url;
  }
  public geturlEmbeded() {

    return this.convertToEmbedLink(this.url)
    
  }  
  private convertToEmbedLink = (url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // Check if it's a valid YouTube URL
      if (urlObj.hostname !== 'www.youtube.com' && urlObj.hostname !== 'youtu.be') {
        throw new Error('Invalid YouTube URL');
      }

      if (urlObj.hostname === 'youtu.be') {
        // Handle shortened YouTube links
        const videoId = urlObj.pathname.slice(1); // Get the video ID from the pathname
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Handle standard YouTube links
      const videoId = urlObj.searchParams.get('v');
      if (!videoId) {
        throw new Error('No video ID found in the URL');
      }

      // Check for playlist
      const playlistId = urlObj.searchParams.get('list');
      return playlistId
        ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
        : `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      return '';
    }
  };
  public getName() {
    return this.name;
  }
}

class VideoBox extends Box {
  constructor(protected title: string, public contents: Array<Video>) {
    super(title);
    this.order = 9;
    this.type_name = "VideoBox";
  }

  public isShareAble(): boolean {
    if (this.contents?.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  public resolveRender(
    theme: string,
    mode?: string,
    options?: any
  ): JSX.Element {
    return (
      <>
        {this.contents?.length > 0 ? (
          <div className={`${theme}-Profile-Vectors hiram tstst`}>
            <Slide
              prevArrow={
                <div
                  className={`${theme}-back-Button-container-box`}
                  style={{ transform: "translate(30%, -50%)" }}
                  data-mode="gallery"
                >
                  <Button disabled={false} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                  </Button>
                </div>
              }
              nextArrow={
                <div
                  className={`${theme}-back-Button-container-box`}
                  style={{ transform: "translate(-30%, -50%)", right: "0%" }}
                  data-mode="gallery"
                >
                  <Button
                    disabled={false}
                    theme={`${theme}-back`}
                    style={{ rotate: "180deg" }}
                  >
                    <div className={`${theme}-back-Button-vector`}></div>
                  </Button>
                </div>
              }
            >
              {this.contents
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  const newSocal = Object.assign(
                    new Video("htps://some.com", ""),
                    item
                  );
                  return <>{newSocal.resolveRender(theme, options.userId)}</>;
                })}
            </Slide>
          </div>
        ) : (
          this.resolveAddRender(theme, mode)
        )}
      </>
    );
  }

  public getRouteAddress(): string {
    return "videos";
  }

  public getLinks() {
    return this.contents;
  }
}

export { VideoBox, Video };
