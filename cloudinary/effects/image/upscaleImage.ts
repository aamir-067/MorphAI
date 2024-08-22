// import { cld } from "@/cloudinary/cloudinary";
// import { upscale } from "@cloudinary/url-gen/actions/effect";
export const upscaleImage = async ({ publicId }: { publicId: string }) => {
	try {
		// const image = cld.image(publicId).effect(upscale());

		// console.log("the url of the image is ==>", image.toURL());

		// return image.toURL();
		return "https://res.cloudinary.com/dedbe6koh/image/upload/e_gen_replace:from_dog;to_bike;preserve-geometry_true;multiple_true/cld-sample.jpg";
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
