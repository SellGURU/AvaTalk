import LocationPicker from "react-leaflet-location-picker";
import { Box } from "..";
import { useState } from "react";

interface Location {
    lat:number
    lan:number
}

class GoogleMapBox extends Box {
    constructor(protected title:string,protected location:Location){
        super(title)
        this.typeName = 'GoogleMapBox'
    }
    
    public resolveRender(theme: string): JSX.Element {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [pointVals] = useState([[this.location.lan, this.location.lat]]);
        const pointMode = {
            banner: false,
            control: {
            values: pointVals,
            
            },
        };         
        return (
            <div className={`${theme}-Profile-Vectors justify-center relative`}>
                <div className="px-6 mt-3 w-full">
                    <LocationPicker showInputs={false} pointMode={pointMode} mapStyle={{ height: "211px", borderRadius: "27px",zIndex:0 }}  />
                </div>            
            </div>            
        )
    }
    public getRouteAddress(): string {
        return 'googlemap'    
    }
}

export default GoogleMapBox