import { Cloudinary } from "@cloudinary/url-gen";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { createContext, useContext, useState } from "react";

export const CloudinaryContext = createContext();

export const useCloudinaryContext = () => {
  const context = useContext(CloudinaryContext);

  return context;
};

export function CloudinaryProvider({ children }) {
  const [processing, setProcessing] = useState(true);
  const [url, setUrl] = useState("");
  const [imageWithoutBg, setImageWithoutBg] = useState("");

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDNAME,
    },
    url: {
      secure: true,
    },
  });

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setProcessing(false);
        const withoutBg = cloudinary
          .image(data.public_id)
          .effect(backgroundRemoval())
          .toURL();
        setImageWithoutBg(withoutBg);
      })
      .catch((err) => console.log(err));
  };

  let intervalId;
  let count = 0;

  if (!processing) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      count++
      let img = new Image();
      img.src = imageWithoutBg;
      img.onload = () => {
        setProcessing(true);
        clearInterval(intervalId);
      };
    }, 500);
  }

  return (
    <CloudinaryContext.Provider
      value={{ processing, url, imageWithoutBg, uploadImage, count }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
}
