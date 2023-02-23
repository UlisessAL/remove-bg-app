import { Cloudinary } from "@cloudinary/url-gen";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import {
  crop,
  fill,
  fit,
  limitFit,
  scale,
} from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
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
  const [functionName, setFunctionName] = useState("");
  const [effect, setEffect] = useState([]);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDNAME,
    },
    url: {
      secure: true,
    },
  });

  const effects = [
    {
      effect: "Resize an image to fill given dimensions",
      info: "Resize your images to fill specified dimensions by setting the width and height. This will resize and crop the image so an image with the exact specified dimensions is generated.",
      id: 1,
      funct: "resizeFillImage",
    },
    {
      effect: "Resize an image",
      info: "Resize your images by setting the width and/or height parameters",
      id: 2,
      funct: "resizeImage",
    },
    {
      effect: "Limiting an image by specified dimensions",
      info: "Keep the original image aspect ratio and all its parts visible, and just limit it's size. Specify the width and height and set the crop parameter to limit. This will create an image that does not exceed the given width and height.",
      id: 3,
      funct: "limitImageDimensions",
    },
    {
      effect: "Convert image into profile image",
      info: "Convert your images to a profile image",
      id: 4,
      funct: "profileImage",
    },
    {
      effect: "Fitting an image within specified dimensions",
      info: "Change image size to fit in given width and height while retaining original proportions.",
      id: 5,
      funct: "fitImage",
    },
    {
      effect: "Crop pictures by custom coordinates",
      info: " Crop your image based on custom/fixed coordinates. Use this method when you know beforehand what the correct absolute cropping coordinates are. This is very useful when your users manually select the region to crop out of the original image.",
      id: 6,
      funct: "cropImage",
    },
  ];

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
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
      count++;
      let img = new Image();
      img.src = imageWithoutBg;
      img.onload = () => {
        setProcessing(true);
        clearInterval(intervalId);
      };
    }, 500);
  }

  const resizeFillImage = (image, width, height) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(fill().width(width).height(height));
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const resizeImage = (image, width, height) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(scale().width(width).height(height));
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const limitImageDimensions = (image, width, height) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(limitFit().width(width).height(height));
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const profileImage = (image, width, height) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(fill().width(width).height(height)).roundCorners(max());
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const fitImage = (image, width, height) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(fit().width(width).height(height));
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const cropImage = (image, width, height, coordinateX, coordinateY) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOADPRESET2);
    data.append("cloud:name", process.env.REACT_APP_CLOUDNAME);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
        setProcessing(false);
        const myImage = cloudinary.image(data.public_id);
        myImage.resize(
          crop().width(width).height(height).x(coordinateX).y(coordinateY)
        );
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const functions = [
    { function: resizeFillImage },
    { function: uploadImage },
    { function: resizeImage },
    { function: limitImageDimensions },
    { function: profileImage },
    { function: fitImage },
    { function: cropImage },
  ];

  const getFunctionByParams = (idParams) => {
    const functionEffect = functions.find((funct) => {
      return funct.function.name === idParams;
    });
    return setFunctionName(functionEffect);
  };

  const getEffectByParams = (idParams) => {
    const getEffect = effects.find((ef) => {
      return ef.funct === idParams;
    });
    return setEffect(getEffect);
  };

  return (
    <CloudinaryContext.Provider
      value={{
        processing,
        url,
        imageWithoutBg,
        uploadImage,
        count,
        getFunctionByParams,
        effects,
        functionName,
        effect,
        getEffectByParams,
      }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
}
