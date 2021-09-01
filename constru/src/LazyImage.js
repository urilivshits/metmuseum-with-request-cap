import React, { useEffect, useState } from "react";
import Color from 'color-thief-react';

const LazyImage = ({alt, objectIds}) => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        const fetchLazyImage = async () => {
            try {
                let randomDepartmentImage = objectIds[Math.floor(Math.random() * objectIds.length)]
                let imagePromise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomDepartmentImage}`);
                let imageData = await imagePromise.json();
                setImage(imageData);
                console.log("rendered");

                if (!imageData.primaryImageSmall.length) {
                    randomDepartmentImage = objectIds[Math.floor(Math.random() * objectIds.length)];
                    imagePromise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomDepartmentImage}`);
                    imageData = await imagePromise.json();
                    setImage(imageData);
                    console.log("rendered second");
                };
            }
            catch (error) {
                console.log('>>>--', error);
            }
        };
        fetchLazyImage();
    }, [objectIds]);

    return (
        <div className="imageDataWrapper">
            <p onClick={() => {window.open(image.objectURL)}} className="imageData">
                Title: {image.title}
                <br></br>
                Author: {image.artistDisplayName}
                <br></br>
                ObjectID: {image.objectID}
                <br></br>
            </p>
            <img 
                src={image.primaryImageSmall}
                alt={alt} 
                id="inputImage" 
            />
            <Color 
                src={image.primaryImageSmall} 
                crossOrigin="anonymous" 
                format="hex">
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    return (
                    <div>
                        Predominant color: <strong>{data}</strong>
                    </div>
                    );
                }}
            </Color>
        </div>
    )
};

export default LazyImage;