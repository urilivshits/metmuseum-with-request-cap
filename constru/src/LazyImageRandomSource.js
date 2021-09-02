import React, { useEffect, useState } from "react";
import Color, { Palette } from 'color-thief-react';

const LazyImageRandomSource = ({alt}) => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        const fetchLazyImage = async () => {
            try {
                let randomImage = Math.floor(Math.random() * 1000);
                setImage(`https://picsum.photos/1000/1000?random=${randomImage}`);
                console.log("rendered");
            }
            catch (error) {
                console.log('>>>--', error);
            } 
        };
        fetchLazyImage();
    }, []);

    return (
        <div className="imageDataWrapper">
                <div className="imageData">
                    <Color 
                        src={image} 
                        crossOrigin="anonymous" 
                        format="hex">
                        {({ data, loading }) => {
                            if (loading) return <p>Dominant Primary Color: Loading...</p>;
                            return (
                            <p>
                                Dominant Primary Color: <strong style={{color: data}}>{data}</strong>
                            </p>
                            );
                        }}
                    </Color>
                    <Palette src={image} crossOrigin="anonymous" format="hex" colorCount={3}>
                        {({ data, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        
                        return (
                            <div style={{display: "flex", marginRight: "1rem"}}>
                            Palette:
                                {data.map((color, index) => 
                                (
                                <p key={index} style={{ color: color }}>
                                    <strong >{color}</strong>
                                </p>
                                ))}
                            </div>
                        );
                        }}
                    </Palette>
                </div>
                <img 
                    style={{cursor: "initial"}}
                    src={image}
                    alt={alt} 
                    id="inputImage" 
                />
        </div>
    );

};

export default LazyImageRandomSource;