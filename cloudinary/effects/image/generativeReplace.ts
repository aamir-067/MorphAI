import { cld } from "@/cloudinary/cloudinary";
import { generativeReplace as replaceItem } from "@cloudinary/url-gen/actions/effect";
export const generativeReplace = async ({
	publicId,
	from,
	to,
	preserveGeometry,
	replaceAll,
}: {
	publicId: string;
	from: string;
	to: string;
	preserveGeometry: boolean;
	replaceAll: boolean;
}) => {
	try {
		const image = cld
			.image(publicId)
			.effect(
				replaceItem()
					.from(from)
					.to(to)
					.preserveGeometry(preserveGeometry)
					.detectMultiple(replaceAll)
			);

		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
