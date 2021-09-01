import './App.css';
import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import LazyLoad from "react-lazyload";

const App = () => {
  const [objectIds, setObjectIds] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11")
    .then(response => response.status === 200 ? response : console.log(`HTTP error! status: ${response.status}`))
    .then(response => response.json())
    .then(objectIds => {
      setObjectIds(objectIds.objectIDs);
    })
    .catch(error => console.log(`There has been a problem with your fetch request: ${error.message}`))
  }, []);

  // console.log("stateObjectIds", objectIds);

  const [imagesToLoad, setImagesToLoad] = useState(40);
  const handleImagesNumber = (e) => {
    setTimeout(() => {
      let value = e.target.value;
      return value === "" ? setImagesToLoad(1) : setImagesToLoad(parseInt(value));
    }, 1000);
  };

  console.log(imagesToLoad);

  if (!objectIds.length) {
    return (
      <div className="App">
        <p>Simple Loader</p>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <div className="navMainWrapper">
          <input
          type="number" 
          placeholder={imagesToLoad} 
          onChange={handleImagesNumber}
          name="number"
          />
          <label htmlFor="number"> / {objectIds.length} images to load from European Paintings department of the MET</label>
        </div>
        <div className="imageMainWrapper">
          {[...Array(imagesToLoad).keys()].map(i => (
              <LazyLoad key={i} height={200}>
                <LazyImage
                  objectIds={objectIds}
                  key={i}
                  alt={`Random image ${i}`}
                />
              </LazyLoad>
          ))}
        </div>
      </div>
    );
  };

  };

export default App;
