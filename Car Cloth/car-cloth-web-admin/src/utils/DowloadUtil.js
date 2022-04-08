export async function downloadImg(imageSrc, fileName){
    if(imageSrc !=null && imageSrc!=""){
      const image = await fetch(imageSrc, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Origin: window.location.origin,
        },
      });
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);
      const link = document.createElement("a");
      link.href = imageURL;
     
      link.download = fileName
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
}