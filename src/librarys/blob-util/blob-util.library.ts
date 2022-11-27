import { IBlobUtilLibrary } from "./blob-util.interface";

export const getBlobToImgUrl = (params: IBlobUtilLibrary.GetBlobToImgUrlParams): Promise<string | ArrayBuffer | null> => {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(reader.result);
    };
    reader.readAsDataURL(params.blob);
  });
};
