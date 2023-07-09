import { CustomizeToast } from "../Utils/CustomizeToast";

export async function uploadImage(selectedFile) {
  const data = new FormData();
  data.append("file", selectedFile);
  data.append("upload_preset", "oo1s4ws2");
  data.append("cloud_name", "dcu6sympq");
  data.append("folder", "socially");
  const requestOptions = {
    method: "POST",
    body: data,
  };
  const url = `https://api.cloudinary.com/v1_1/dcu6sympq/image/upload`;
  try {
    let result = await fetch(url, requestOptions);
    result = await result.json();
    return result;
  } catch (error) {
    console.error(error);
    CustomizeToast("error", "Error in uploading media");
  }
}
