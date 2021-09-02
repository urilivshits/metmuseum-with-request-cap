import React, { useEffect, useState } from "react";

const LazyImage = ({alt, objectIds, imageSourceOriginal, setImageSourceOriginal}) => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        const fetchLazyImage = async () => {
            try {
                let randomDepartmentImage = objectIds[Math.floor(Math.random() * objectIds.length)]
                let imagePromise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomDepartmentImage}`);
                let imageData = await imagePromise.json();
                setImage(imageData);

                if (!imageData.primaryImageSmall.length) {
                    randomDepartmentImage = objectIds[Math.floor(Math.random() * objectIds.length)];
                    imagePromise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomDepartmentImage}`);
                    imageData = await imagePromise.json();
                    setImage(imageData);
                };
            }
            catch (error) {
                console.log('>>>--', error);
            }
        };
        fetchLazyImage();
    }, [objectIds, imageSourceOriginal]);

    // const changeHeader = () => {
    //     fetch("http://localhost:3001/changeheader", {
    //             method: "post",
    //             headers: {"Content-Type": "application/json"},
    //             // mode: "no-cors",
    //             body: JSON.stringify({
    //                 image: image
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(imgUrl => {
    //             // setImageNewHeaders(`https://thingproxy.freeboard.io/fetch/${imgUrl}`);
    //             setImageNewHeaders(imgUrl);
    //         })
    // };

    return (
        <div className="imageDataWrapper">
            <div className="imageData">
                Title: {image.title}
                <br></br>
                Author: {image.artistDisplayName}
                <br></br>
                ObjectID: {image.objectID}
                <br></br>
            </div>
            <img 
                onClick={() => {window.open(image.objectURL)}}
                src={image.primaryImageSmall}
                alt={alt} 
                id="inputImage" 
            />
        </div>
    );
};

export default LazyImage;