import { Cloudinary } from "@cloudinary/url-gen";
import { brightness } from "@cloudinary/url-gen/actions/adjust";
import {
  backgroundRemoval,
  pixelate,
} from "@cloudinary/url-gen/actions/effect";
import {
  crop,
  fill,
  fit,
  limitFit,
  scale,
} from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { faces } from "@cloudinary/url-gen/qualifiers/region";
import { createContext, useContext, useState } from "react";
import exampleBg from "../img/example-bg.webp";

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
      effect: "Remove image's background",
      info: "Remove your image's background by only clicking a button!",
      id: 0,
      funct: "uploadImage",
      image: exampleBg,
    },
    {
      effect: "Resize an image to fill given dimensions",
      info: "Resize your images to fill specified dimensions by setting the width and height. This will resize and crop the image so an image with the exact specified dimensions is generated.",
      id: 1,
      funct: "resizeFillImage",
      image:
        "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      max: 3000,
    },
    {
      effect: "Resize an image",
      info: "Resize your images by setting the width and/or height parameters",
      id: 2,
      funct: "resizeImage",
      image:
        "https://images.unsplash.com/photo-1475518112798-86ae358241eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      max: 3000,
    },
    {
      effect: "Limiting an image by specified dimensions",
      info: "Keep the original image aspect ratio and all its parts visible, and just limit it's size. Specify the width and height and set the crop parameter to limit. This will create an image that does not exceed the given width and height.",
      id: 3,
      funct: "limitImageDimensions",
      image:
        "https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      max: 3000,
    },
    {
      effect: "Convert image into profile image",
      info: "Convert your images to a profile image",
      id: 4,
      funct: "profileImage",
      image:
        "https://res.cloudinary.com/djmqd8hau/image/upload/c_fill,h_250,w_387/r_max/sndisshec2w1raxwgeiq?_a=ATCqVAA0",
      max: 1000,
    },
    {
      effect: "Fitting an image within specified dimensions",
      info: "Change image size to fit in given width and height while retaining original proportions.",
      id: 5,
      funct: "fitImage",
      image:
        "https://images.unsplash.com/photo-1497473376897-16fbb7552478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      max: 3000,
    },
    {
      effect: "Crop pictures by custom coordinates",
      info: " Crop your image based on custom/fixed coordinates. Use this method when you know beforehand what the correct absolute cropping coordinates are. This is very useful when your users manually select the region to crop out of the original image.",
      id: 6,
      funct: "cropImage",
      image:
        "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      max: 3000,
    },
    {
      effect: "Pixelate faces",
      info: "Hide faces in your images",
      id: 7,
      funct: "pixelFace",
      image:
        "https://res.cloudinary.com/djmqd8hau/image/upload/e_pixelate_faces:35/vjehtaux2uzyrnuiseh0?_a=ATCqVAA0%200",
      max: 100,
    },
    {
      effect: "Adjust image brightness",
      info: "Adjust the brightness of an image",
      id: 8,
      funct: "imageBrightness",
      image:
        "https://res.cloudinary.com/djmqd8hau/image/upload/e_brightness:30/c2x13xxlwkg7o6vmqr7k?_a=ATCqVAA0%200",
      max: 50,
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

  const uploadToCld = (image, doFunction) => {
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
        doFunction(data.public_id);
      })
      .catch((error) => console.log(error));
  };

  const resizeFillImage = (image, width, height) => {
    const resizeTheFillImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(fill().width(width).height(height));
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, resizeTheFillImage);
  };

  const resizeImage = (image, width, height) => {
    const resizeTheImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(scale().width(width).height(height));
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, resizeTheImage);
  };

  const limitImageDimensions = (image, width, height) => {
    const limitTheImageDimensions = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(limitFit().width(width).height(height));
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, limitTheImageDimensions);
  };

  const profileImage = (image) => {
    const profileTheImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(fill().width(170).height(170)).roundCorners(max());
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, profileTheImage);
  };

  const fitImage = (image, width, height) => {
    const fillTheImage = (data) => {
      const myImage = cloudinary.image(data);
      myImage.resize(fit().width(width).height(height));
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, fillTheImage);
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

  const pixelFace = (image, pixelation) => {
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
        myImage.effect(pixelate().squareSize(pixelation).region(faces()));
        const myUrl = myImage.toURL();
        setImageWithoutBg(myUrl);
      });
  };

  const imageBrightness = (image, brightnessLevel) => {
    const imageTheBrightness = (data) => {
      const myImage = cloudinary.image(data);
      myImage.adjust(brightness().level(brightnessLevel));
      const myUrl = myImage.toURL();
      setImageWithoutBg(myUrl);
    };

    uploadToCld(image, imageTheBrightness);
  };

  const functions = [
    { function: resizeFillImage },
    { function: uploadImage },
    { function: resizeImage },
    { function: limitImageDimensions },
    { function: profileImage },
    { function: fitImage },
    { function: cropImage },
    { function: pixelFace },
    { function: imageBrightness },
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
