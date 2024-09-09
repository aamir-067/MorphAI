import { server } from "@/CONSTANTS";
export const deleteFromCloudinary = async (fileUri: string) => {
	try {
		await fetch(server + "/api/v1/general/application-latest-version", {
			method: "DELETE",
			body: JSON.stringify({
				fileUri,
			}),
		});
	} catch (error) {
		console.log("error occurred : ", error);
	}
};
