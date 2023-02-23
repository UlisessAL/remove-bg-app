const effects = [
    {effect:"Resize an image to fill given dimensions", info:"Resize your images to fill specified dimensions by setting the width and height. This will resize and crop the image so an image with the exact specified dimensions is generated.", id:1},
    {effect: "Resize an image", info:"Resize your images by setting the width and/or height parameters",id:2},
    {effect:"Face detection-based image cropping", info:"Detect faces' position within an image, and crop a thumbnail based on the detected face.",id:3}
  ]

  export const getEffects = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(effects)
    }, 500);
});