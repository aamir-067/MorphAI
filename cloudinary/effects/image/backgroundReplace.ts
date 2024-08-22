// import { cld } from "@/cloudinary/cloudinary";
// import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
export const replaceImageBackground = async ({
	publicId,
	prompt,
}: {
	publicId: string;
	prompt: string;
}) => {
	try {
		// const image = cld
		// 	.image(publicId)
		// 	.effect(generativeBackgroundReplace().prompt(prompt));

		// console.log("the url of the image is ==>", image.toURL());

		// return image.toURL();
		return "https://res.cloudinary.com/dedbe6koh/image/upload/e_gen_replace:from_dog;to_bike;preserve-geometry_true;multiple_true/cld-sample.jpg";
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
