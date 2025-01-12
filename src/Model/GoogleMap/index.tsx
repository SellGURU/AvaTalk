// import LocationPicker, { PointMode } from "react-leaflet-location-picker";
// import { useState } from "react";
import { Box } from "..";
// import { LatLngTuple } from "leaflet";
// import LeafletMapLoader, { Init } from "../../Components/Base/LefeatMapLoader";
// import { createRef } from "react";
// import { LeafletElement } from "../../Components/Base/LefeatMapLoader/leaflet-map-loader";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import { publish } from "../../utils/event";
// import { position } from "html2canvas/dist/types/css/property-descriptors/position";

interface Location {
    lat:number
    lan:number
}

class GoogleMapBox extends Box {
    constructor(protected title:string,public location:Location,public address:string,protected isLocation?:boolean){
        super(title)
        this.type_name = 'AddressBox'
        this.order = 8
    }
    public getISLocation () {
        return this.isLocation
    }
    public setISLocation (action:boolean) {
        this.isLocation  = action
    }
    private openMap = () => {
        // publish("showGoogleMapModal",{value:this.location})
        // // Construct the Google Maps URL
        const googleMapUrl = `https://www.google.com/maps?q=${this.location.lan},${this.location.lat}`;
        // // Open the URL in the user's default browser or map app
        window.open(googleMapUrl, "_blank"); // Opens in a new tab
    };
    private resolveAddresRender () {
        return this.address
        // if(this.address.length<=30){
        //     return this.address
        // }
        // if(this.address.length>30){
        //     return this.address.substring(0,30)+ '...'
        // }
    }
    public resolveRender(theme: string): JSX.Element {
        
 
        return (
            <div className={`${theme}-Profile-Vectors justify-center relative`}>
                {this.location && this.address.length>0 &&
                    <>
                    
                        <div onClick={() =>{
                            this.openMap()
                        }} className="w-full  flex cursor-pointer justify-start  gap-3 items-start px-4 bg-[#F3F4F6] py-3 borderBox-Gray min-h-[52px] rounded-[27px]" style={{
                            boxShadow:'4px 4px 20px 0px #886FB069'
                        }}>
                            {
                                this.isLocation &&
                                    <div>
                                        <div className="w-6 h-6 borderBox-Gray rounded-[6px] flex justify-center items-center">
                                            <div className="Carbon-ContactDetails-Vectors Carbon-ContactDetails-locationIcon Carbon-ContactDetails-ActiveVectors"></div>
                                        </div>
                                    </div>

                            }
                            <div className="">

                                <div className="text-[#374151] overflow-hidden flex-grow text-[12px] md:text-[14px] text-wrap break-words font-medium " style={{overflowWrap:'anywhere'}}>

                                    {this.resolveAddresRender()}
                                </div>
                            </div>
                        </div>
                        {this.isLocation &&
                            <div className="px-0 mt-3 w-full relative z-0 " onClick={() => {
                                this.openMap()
                            }}>
                                <MapContainer dragging={false} zoomControl={false} touchZoom={false} scrollWheelZoom={false}  center={[this.location?.lan, this.location?.lat]} zoom={13} style={{ height: '250px', borderRadius: '27px' }}>
                                    <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[this.location?.lan, this.location?.lat]} />
                                    
                                </MapContainer>
                            </div>            
                        }
                    </>
                }
            </div>            
        )
    }
    public getRouteAddress(): string {
        return 'googlemap'    
    }
}

export default GoogleMapBox