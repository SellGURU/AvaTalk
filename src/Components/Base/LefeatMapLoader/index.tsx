/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { initializeMap, MapConfig } from "./leaflet-map-loader";
import clsx from "clsx";

export type Init = (
  callback: (
    mapConfig: MapConfig
  ) => ReturnType<typeof initializeMap> | undefined
) => void;

interface LeafletMapLoaderProps extends React.ComponentPropsWithoutRef<"div"> {
  init: Init;
  darkMode?: boolean;
  mapRef:React.MutableRefObject<any>
}

function LeafletMapLoader(props: LeafletMapLoaderProps) {
  // const mapRef = createRef<LeafletElement>();
  useEffect(() => {
    props.init((mapConfig) => {
      if (props.mapRef.current) {
        return initializeMap(props.mapRef.current, mapConfig);
      }
    });
  }, [props, props.init]);

  return (
    <div
      ref={props.mapRef}
      className={clsx([
        !props.darkMode && "[&_.leaflet-tile-pane]:saturate-[.3]",
        props.darkMode &&
          "[&_.leaflet-tile-pane]:grayscale [&_.leaflet-tile-pane]:invert [&_.leaflet-tile-pane]:brightness-90 [&_.leaflet-tile-pane]:hue-rotate-15",
        props.className,
      ])}
    ></div>
  );
}

LeafletMapLoader.defaultProps = {
  init: () => {},
};

export default LeafletMapLoader;
