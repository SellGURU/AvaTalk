import { Box } from "..";
import { Button } from "symphony-ui";

class AvailabilityBox extends Box {
  constructor(protected title: string, protected url: string) {
    super(title);
    this.order = 7;
    this.type_name = "MeetingBox";
  }
  public getUrl() {
    return this.url;
  }
  public resolveRender(theme: string, mode?: string) {
    return (
      <>
        {this.url == "" ? (
          this.resolveAddRender(theme, mode)
        ) : (
          <>
            <Button
              onClick={() => {
                window.open(this.url, "_blank");
              }}
              theme="Carbon"
              data-mode="profile-edit-button"
            >
              <div className={`${theme}-Profile-EditProfileBtnVector4`}></div>
              <div className="   text-white">Book an appointment</div>
            </Button>

            {/* <Button
              onClick={() => {
                {this.url}
              }}
              theme="Carbon-Google"
              data-mode="profile-edit-button"
            >
              <div className={`${theme}-Profile-EditProfileBtnVector4`}></div>
              <div className="text-[#8290a3]">Book an appointment</div>
            </Button> */}
          </>
        )}
      </>
    );
  }
  public isShareAble(): boolean {
    if (this.url.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  public getRouteAddress(): string {
    return "availability";
  }
}

export default AvailabilityBox;
