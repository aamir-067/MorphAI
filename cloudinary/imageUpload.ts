// import { upload } from "cloudinary-react-native";
// import { Alert } from "react-native";
// import { cld } from "./cloudinary";
// import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

// export const uploadAsset = async ({
// 	fileUri,
// }: {
// 	fileUri: string;
// }): Promise<UploadApiResponse | undefined> => {
// 	try {
// 		let response, errs;
// 		await upload(cld, {
// 			file: fileUri,
// 			options: { upload_preset: "unsigned_true", unique_filename: false },
// 			callback: (err, res) => {
// 				console.log(err, res);
// 				response = res;
// 				errs = err;
// 			},
// 		});

// 		return errs ? undefined : response;
// 	} catch (error) {
// 		console.log(error);
// 		Alert.alert("Error", "Something went wrong while processing");
// 		return undefined;
// 	}
// };
