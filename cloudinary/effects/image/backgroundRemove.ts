// import { cld } from "@/cloudinary/cloudinary";
// import {
// 	// backgroundRemoval,   // you can transform only 10 picture per month with this one.
// 	removeBackground,
// } from "@cloudinary/url-gen/actions/effect";
export const removeImageBackground = async ({
	publicId,
}: {
	publicId: string;
}) => {
	try {
		// const image = cld.image(publicId).effect(removeBackground());

		// return image.toURL();
		return "https://res.cloudinary.com/dedbe6koh/image/upload/e_gen_replace:from_dog;to_bike;preserve-geometry_true;multiple_true/cld-sample.jpg";
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
