/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon } from "../../../Components";
import { useAuth } from "../../../hooks/useAuth.tsx";
import { createRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Sortable from "sortablejs/modular/sortable.complete.esm.js";
import * as Yup from "yup";
import { confirmAlert } from "react-confirm-alert";
import { AddLink, Confirm, ReadyForMore } from "../../../Components/__Modal__";
import { Video, VideoBox } from "../../../Model/Video";

const regex = /^.*Test.*$/;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  url: Yup.string().matches(regex),
});

const EditVideos = () => {
  const auth = useAuth();
  let currentBox = auth.currentUser.boxs.filter(
    (item) => item.getTypeName() == "VideoBox"
  )[0] as VideoBox;

  if (currentBox == undefined) {
    currentBox = new VideoBox("video", []);
  }
  const confirmRef = createRef<HTMLDivElement>();
  // const [links,setLinks] = useState<Array<Video>>(currentBox.getLinks().map(((item:any) => Object.assign(new Video('',''),item))))
  const [video, setVideo] = useState<Array<Video>>(
    currentBox.contents.map((item: any) =>
      Object.assign(new Video("", ""), item)
    )
  );

  // const [selectItem,setSelectedItem] = useState<null|Social>(null)
  const initialValue = {
    title: currentBox.getTitle(),
    url: "",
    name: "",
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [editName, setEditName] = useState("");
  const [editeValue, setEditeValue] = useState("");
  const [isReadyTO,setIsReadyTo] = useState(false)
  const addLink = (name: string, url: string) => {
    const newVidoe = new Video(url, name);
    if (editName != "") {
      setVideo([...video.filter((el) => el.getName() != editName), newVidoe]);
      setEditName("");
      setEditeValue("");
    } else {
      setVideo([...video, newVidoe]);
    }
  };
  const [openaddlink, setOpenAddLink] = useState(false);
  const navigate = useNavigate();
  const submit = () => {
    auth.currentUser.addBox(new VideoBox(formik.values.title, video));
    navigate("/");
  };
  const deleteSocial = (index: number) => {
    const newArr = [...video];
    newArr.splice(index, 1);
    console.log(newArr);
    setVideo(newArr);
  };
  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById("sortable2");
      Sortable.create(el, {
        animation: 150,
        filter: ".ignore-elements",
      });
    }, 500);
  });
  return (
    <>
      <h1>hi</h1>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="Videos" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="px-6 mt-24  mb-[24px]">
            <AccessNotifManager page="VideoSetting"></AccessNotifManager>
          </div>
          <div className=" px-6">
            <TextField
              {...formik.getFieldProps("title")}
              inValid={
                formik.errors?.title != undefined &&
                (formik.touched?.title as boolean)
              }
              theme="Carbon"
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title..."
            ></TextField>
          </div>

          {video.length == 0 ? (
            <div className="mt-3 px-6">
              <TextField
                theme="Carbon"
                disabled
                label="Video Links"
                inValid={false}
                name="title"
                onBlur={() => {}}
                onChange={() => {}}
                type="text"
                value=""
                placeholder="No Video Link"
              ></TextField>
            </div>
          ) : (
            <>
              <ul style={{ width: "100%" }}>
                <div
                  className={`Carbon-Select-label mt-4 pl-6 w-full text-left`}
                >
                  videos Links
                </div>
                {video.map((item: any, index) => {
                  return (
                    <li
                      data-mame={item.getName()}
                      draggable
                      onDrag={() => {
                        const element =
                          document.getElementById("sortable2")?.children;
                        const resolve = video.map((_el, index) => {
                          return element?.item(index)?.attributes[0].value;
                        });
                        resolve.forEach((elem, ind) => {
                          if (video.find((e) => e.getName() == elem)) {
                            video.filter((e) => e.getName() == elem)[0].order =
                              ind;
                          }
                        });
                      }}
                      className="mt-3 px-6"
                    >
                      <div className="Carbon-TextField-input flex items-center text-left  h-[50px]">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex justify-start ml-4 items-center">
                            {/* <img className="h-4" src={"./icons/media/"+item.miniIconUrl()} alt="" /> */}
                            <div className="">
                              <div className="text-[13px] mb-[-4px]">
                                {item.getName()}
                              </div>
                              <a href="">
                                <div className=" text-[10px] text-cyan-500">
                                  {item.geturl().substring(0, 30)}
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="flex justify-end gap-1 items-start">
                            {video.length > 1 ? (
                              <div>
                                <div
                                  className={`Carbon-ContentCard-ArrowVector Carbon-ContentCard-MaskVector `}
                                  style={{ height: "20px", width: "20px" }}
                                ></div>
                              </div>
                            ) : undefined}
                            <div
                              onClick={() => {
                                setEditName(item.getName());
                                setEditeValue(item.geturl());
                                setOpenAddLink(true);
                              }}
                              className={`Carbon-ContactDetails-editIcon`}
                            ></div>
                            <div
                              onClick={() => {
                                // setConfirmDelete(true)
                                confirmAlert({
                                  customUI: ({ onClose }) => {
                                    return (
                                      <Confirm
                                        refrence={confirmRef}
                                        onConfirm={() => deleteSocial(index)}
                                        content="Are you sure you want to delete this Video link?"
                                        title="Delete Video Link"
                                        onClose={onClose}
                                      ></Confirm>
                                    );
                                  },
                                  overlayClassName: "dispalyOverLay",
                                });
                                // deleteSocial(index)
                              }}
                              className={`Carbon-ContactDetails-recycleIcon`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <div className="px-6 mt-3">
            <Button
              onClick={() => {
                if(auth.currentUser.type_of_account.getType() == 'Free' && video.length >= 1){
                  setIsReadyTo(true)
                }else {
                  setOpenAddLink(!openaddlink)
                }
              }}
              theme="Carbon-AddLink"
            >
              Add video Link
            </Button>
            <div className="relative"></div>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
              Save Changes
            </Button>
          </div>
          <AddLink
            name={editName}
            value={editeValue}
            theme="Carbon"
            isOpen={openaddlink}
            placeholder="https://www.youtube.com"
            onClose={() => {
              setEditName("");
              setEditeValue("");
              setOpenAddLink(false);
            }}
            onComplete={(name: string, url: string) => {
              formik.setFieldValue("url", url);
              formik.setFieldValue("name", name);
              addLink(name, url);
            }}
            title="Link"
          ></AddLink>
        </div>
        {isReadyTO &&
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <ReadyForMore page="Video" onClose={() => {
              setIsReadyTo(false)
            }} ></ReadyForMore>
          </div>
        }           
      </div>
    </>
  );
};
export default EditVideos;
