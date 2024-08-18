import { cld } from "@/cloudinary/cloudinary";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
export const replaceImageBackground = async () => {
	try {
		console.log("started transformation");
		const image = cld
			.image("nkib5pwmpjo87rhrk6op")
			.effect(
				generativeBackgroundReplace().prompt(
					"replace the background of the image with football ground"
				)
			);

		console.log("Transformed Image is ==>", image);
		console.log("the url of the image is ==>", image.toURL());

		return image;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
