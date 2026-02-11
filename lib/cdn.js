import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// const saveImage = async (buffer) => {
//   try {
//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "ai-generated-images",
//           public_id: `img_${Date.now()}`,
//           resource_type: "image",
//           transformation: [{ quality: "auto", fetch_format: "auto" }],
//         },
//         (err, result) => {
//           if (err) {
//             console.log(err)
//             return reject(err)
//           };
//            resolve(result);
//         },
//       );

//       const readStream = streamifier.createReadStream(buffer);

//       // ---- Handle stream errors (EPIPE fix) ----
//       readStream.on("error", reject);
//       uploadStream.on("error", reject);

//       readStream.pipe(uploadStream);
//     });
//     return result;
//   } catch (err) {
//     console.error("Cloudinary Upload Error:", err.message);

//     // Retry once on EPIPE (network glitch)
//     if (err.code === "EPIPE") {
//       console.log("Retrying upload...");
//       return await saveImage(buffer);
//     }

//     throw err;
//   }

//   // try {
//   //   const savedImage = await cloudinary.uploader
//   //     .upload(data, {
//   //       folder: "ai-generated-images",
//   //       public_id: `img_${Date.now()}`,
//   //       resource_type: "image",
//   //       transformation: [{ quality: "auto", fetch_format: "auto" }],
//   //     })
//   //     .catch((err) => console.log(err));
//   //   return savedImage;
//   // } catch (error) {
//   //   console.log(`Error while saving image to cloudinary ${error.message}`);
//   // }
// };
const saveImage = async (data) => {
  // try {
  //   cloudinary.config({
  //     cloud_name: "dkpila5fh",
  //     api_key: "525576432342115",
  //     api_secret: process.env.CLOUDINARY_API_SECRET,
  //     timeout: 120000,
  //   });
  //   const result = await new Promise((resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       {
  //         folder: "ai-generated-images",
  //         public_id: `img_${Date.now()}`,
  //         resource_type: "image",
  //       },
  //       async (err, res) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         resolve(res);
  //       },
  //     );
  //     const r = streamifier.createReadStream(data);
  //     r.on("error", (error)=> console.log("read-stream-error",error));
  //     uploadStream.on("error", (error)=> console.log("upload-stream-error", error));

  //     r.pipe(uploadStream);
  //   });
  //   return result;
  // } catch (error) {
  //   if(error.code === "EPIPE"){
  //     console.log("Retrying upload...");
  //     return await saveImage(data);
  //   }
  //   console.log(`Error uploading image to cloudinary: ${error}`);
  // }
  try {
    cloudinary.config({
      cloud_name: "dkpila5fh",
      api_key: "525576432342115",
      api_secret: process.env.CLOUDINARY_API_SECRET,
      timeout: 120000,
    });
    const savedImage = await cloudinary.uploader
      .upload(data, {
        folder: "ai-generated-images",
        public_id: `img_${Date.now()}`,
        resource_type: "image",
      })
      .catch((err) => console.log(err));
    return savedImage;
  } catch (error) {
    console.log(`Error while saving image to cloudinary ${error.message}`);
  }
};

export default saveImage;
