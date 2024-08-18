import { cld } from "@/cloudinary/cloudinary";
import {
	// backgroundRemoval,   // you can transform only 10 picture per month with this one.
	removeBackground,
} from "@cloudinary/url-gen/actions/effect";
export const removeImageBackground = async ({
	publicId,
}: {
	publicId: string;
}) => {
	try {
		const image = cld.image(publicId).effect(removeBackground());
		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
