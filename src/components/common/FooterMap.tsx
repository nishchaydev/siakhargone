
import React from 'react';

type GoogleMapProps = {
    src: string;
};

const GoogleMap = ({ src }: GoogleMapProps) => {
    return (
        <iframe
            src={src}
            title="Google Map showing school location"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="opacity-90 group-hover:opacity-100 transition-opacity grayscale-[0.2] group-hover:grayscale-0"
        ></iframe>
    );
};

export default GoogleMap;
