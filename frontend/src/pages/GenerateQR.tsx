import { ChangeEvent, useState } from "react";
import QRCode from "react-qr-code";
import { loadFile, uploadFile } from "../lib/utils";

const GenerateQR = () => {
  const [url, setUrl] = useState<string>("");

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      const fileType = file.type.split("/")[1];
      const filePath = fileType.endsWith(".document")
        ? `docx_${file.lastModified}.docx`
        : `${fileType}_${file.lastModified}`;

      const result = await uploadFile(file, filePath);
      console.log(result, filePath);

      const downloadURL = await loadFile(filePath);
      if (downloadURL) {
        return setUrl(`http://localhost:5173/${fileType}_${file.lastModified}`);
      }

      console.log(result);
      // if (result?.error) {
      //   // setError({ for: "profile", text: result.message });
      //   console.log(result);
      // } else {
      //   // setPhotoURL(result.url);
      //   console.log(result.url);
      // }
    }
  };

  const onSubmit = () => {};

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-5">
      <form
        onSubmit={onSubmit}
        className="border border-purple-500 p-5 rounded-md"
      >
        <div className="grid grid-cols-1 gap-2 sm:gap-5">
          <label className=" sm:col-span-2 ">
            Recipe Image:
            <input
              type="file"
              onChange={handleUploadImage}
              className="input input-bordered p-2 w-full"
            />
          </label>
          <label className=" sm:col-span-2">
            Recipe Name:
            <input
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            className="cursor-pointer text-white px-3 py-1 font-bold text-lg rounded-full bg-[var(--primary-color)] duration-300 opacity-90 hover:opacity-100 mx-auto w-[180px] my-5"
            value="Generate QR Code"
          />
        </div>
      </form>

      {url && (
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "200px" }}
          value={url}
          viewBox={`0 0 256 256`}
        />
      )}
    </div>
  );
};

export default GenerateQR;
