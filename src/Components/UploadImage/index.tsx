/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HtmlHTMLAttributes, useState } from "react";


type ImageUploadrProps = HtmlHTMLAttributes<HTMLDivElement> & {
  theme?: string;
  uploades?: (files:Array<any>) => void
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageUploadr: React.FC<ImageUploadrProps> = ({ children, theme, uploades, ...props }) => {
  const [isLoading,setisLoading] = useState(false);
  const [files,setFiles] = useState<Array<any>>([]);
  const getBase64 = (file:any,name:string) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          setFiles([...files,{
            url:reader.result,
            name:name
          }])
          if(uploades){
            uploades([...files,{
              url:reader.result,
              name:name
            }])
          }
          setisLoading(false)       
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }   
  const deleteFile = (index:number) => {
    const newArr = [...files]
    newArr.splice(index,1)
    setFiles(newArr)
  }
  return (
    <div className={`${theme}-ImageUploader-container`} {...props}>
          <div className={`${theme}-ImageUploader-uploadBox-container`}>
              {isLoading ?
                  <div className={`${theme}-ImageUploader-uploadBox-loading`}>
                              
                  </div>                                         
                  :
                  <div className={`${theme}-ImageUploader-uploadBox-box ${files.length >0 ? `${theme}-ImageUploader-uploadBox-fileExist`:undefined}`}>
                      <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        height:'100%'
                      }}>
                          <div style={{display:'grid'}}>
                            <div className={`${theme}-ImageUploader-icon`}></div>
                              <div style={{
                                fontSize:'12px',
                                textAlign:'center',
                                color:'#0F0F0F',
                                fontWeight:'500'
                              }}>
                                  Drag & drop image or <span style={{color:'#00B5FB',cursor:'pointer'}}>Browse</span> 
                              </div>
                              <div className={`${theme}-ImageUploader-uploader-suportText-container`}>
                                  <div className={`${theme}-ImageUploader-uploader-suportText`}>Supported formats: JPEG, PNG</div>
                              </div>
                          </div>
                      </div>
                      <input  onChange={(res:any) => {
                          setisLoading(true)
                          getBase64(res.target.files[0],res.target.value)    
                      }}  className={`${theme}-ImageUploader-uploader-input`} type="file" id="upload-button" multiple accept="*" />                        
                  </div>
            }
            {files.length > 0 ? 
              <>
                <div>
                  <div className={`${theme}-ImageUploader-itemList-titleBox`}>Uploaded</div>
                  <div className={`${theme}-ImageUploader-itemList-items`}>
                    {files.map((item,index) => {
                      return (
                        <div key={index} className={`${theme}-ImageUploader-uploadBox-file`}>
                          <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(15)}</div>
                          <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            : undefined}
          </div>      
    </div>
  );
};

ImageUploadr.defaultProps = {
  theme: "Carbon",
};

export default ImageUploadr;
