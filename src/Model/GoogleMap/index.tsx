// import LocationPicker, { PointMode } from "react-leaflet-location-picker";
import { Box } from "..";
// import { LatLngTuple } from "leaflet";
// import LeafletMapLoader, { Init } from "../../Components/Base/LefeatMapLoader";
// import { createRef } from "react";
// import { LeafletElement } from "../../Components/Base/LefeatMapLoader/leaflet-map-loader";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface Location {
    lat:number
    lan:number
}

class GoogleMapBox extends Box {
    constructor(protected title:string,public location:Location){
        super(title)
        this.type_name = 'GoogleMapBox'
        this.order = 5
    }
    public resolveRender(theme: string): JSX.Element {
        // const mapRef = createRef<LeafletElement>();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // console.log(mode)    
        // const init: Init = async (initializeMap) => {
        // const mapMarkerSvg =
        //     window.btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="31.063" viewBox="0 0 20 31.063">
        //             <g id="Group_16" data-name="Group 16" transform="translate(-408 -150.001)">
        //             <path id="Subtraction_21" data-name="Subtraction 21" d="M10,31.064h0L1.462,15.208A10,10,0,1,1,20,10a9.9,9.9,0,0,1-1.078,4.522l-.056.108c-.037.071-.077.146-.121.223L10,31.062ZM10,2a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z" transform="translate(408 150)" fill="#eb2617"/>
        //             <circle id="Ellipse_26" data-name="Ellipse 26" cx="6" cy="6" r="6" transform="translate(412 154)" fill="#eb2617"/>
        //             </g>
        //         </svg>
        //         `);            
        //     const mapInstance =await initializeMap({
        //     config: {
        //         center:[this.location.lan,this.location.lat],
        //         zoom:14,
        //     },
        //     });    
        //     if (mapInstance) {
        //     const apiKey = "AIzaSyB0NfYbn1RS0UvUX8HE40l_uykzQXYy6d8";
        //     const { map, leaflet } = mapInstance;

        //     leaflet
        //         .tileLayer(
        //         `https://tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${apiKey}`,
        //         {
        //             attribution:
        //             "Map data &copy; OpenStreetMap contributors, Tiles &copy; Thunderforest",
        //         }
        //         )
        //         .addTo(map);

        //     const marker = leaflet.marker(
        //     {
        //         lat:this.location.lan,
        //         lng:this.location.lat,
        //     },
        //     {
        //         title: 'location',
        //         attribution:'',
        //         icon: leaflet.icon({
        //         iconUrl: `data:image/svg+xml;base64,${mapMarkerSvg}`,
        //         iconAnchor: leaflet.point(10, 35),
        //         }),
        //     }
        //     );    
        //     map.addLayer(marker);                             
        //     }           
        // }       
 
        return (
            <div className={`${theme}-Profile-Vectors justify-center relative`}>
                {this.location &&
                    <div className="px-0 mt-3 w-full relative z-0">
                                <MapContainer dragging={false}  center={[this.location?.lan, this.location?.lat]} zoom={13} style={{ height: '250px', borderRadius: '27px' }}>
                                    <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[this.location?.lan, this.location?.lat]} />
                                    
                                </MapContainer>


                    </div>            
                }
            </div>            
        )
    }
    public getRouteAddress(): string {
        return 'googlemap'    
    }
}

export default GoogleMapBox