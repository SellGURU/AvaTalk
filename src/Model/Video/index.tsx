import { Box } from "../index.ts";
import { Auth } from "../../Api";
import { Tooltip } from "react-tooltip";
import ReactImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

class Video {
  public order: number = -1;
  constructor(protected url: string, protected name: string) {}
  public resolveRender(theme: string, userID: string) {
    console.log("this.geturl() mkmk", this.geturl());
    
    return (
      <div className={`w-full`}>
        <div
          data-tooltip-id={"link" + this.geturl()}
          data-tooltip-content={this.geturl()}
          onClick={() => this.handleMoreInfoClick(userID)}
        >
          <iframe
          className=" !rounded-xl"
            width="100%"
            height="315"
            src={this.geturl()}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Tooltip id={"link" + this.geturl()} />
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
    // Extract the video ID from the original URL
    const videoId = this.url.split("v=")[1];
    // Construct the embed URL
    return `https://www.youtube.com/embed/${videoId}`;
  }

  public getName() {
    return this.name;
  }
}

class VideoBox extends Box {
  constructor(protected title: string, public links: Array<Video>) {
    super(title);
    this.order = 3;
    this.type_name = "VideoBox";
  }
  public isShareAble(): boolean {
    if (this.links.length == 0) {
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
        {this.links.length > 0 ? (
          <div className={`${theme}-Profile-Vectors hiram tstst`}>
            <Slide>
              {this.links
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  const newSocal = Object.assign(
                    new Video("htps://some.com", ""),
                    item
                  );
                  return (
                    <>
                      {newSocal.resolveRender(
                        theme,
                        options.userId,
                      )}
                    </>
                  );
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
    return this.links;
  }
}
export { VideoBox, Video };
