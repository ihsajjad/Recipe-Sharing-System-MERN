import { useEffect, useState } from "react";
import { PDFObject } from "react-pdfobject";
import { useParams } from "react-router-dom";
import { loadFile } from "../lib/utils";

const ViewFile = () => {
  const { filePath } = useParams();
  const [url, setUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    const loadFileURL = async () => {
      if (filePath?.startsWith("docx" || "doc")) {
        const docxUrl = await loadFile(`${filePath}.docx`);
        console.log(docxUrl);
        setUrl(docxUrl);

        return;
      }

      const data = await loadFile(`${filePath}`);

      setUrl(data);
      setFileType(filePath ? filePath?.split("_")[0] : "");
    };

    filePath && loadFileURL();
  }, [filePath]);

  if (fileType === "pdf") return <PDFObject height="100vh" url={url} />;

  if (fileType === "doc") return <div></div>;
  console.log(filePath, url);

  if (filePath?.startsWith("docx" || "doc")) {
    return (
      <div>
        <a href={url}>Download the docx</a>
      </div>
    );
  }
  return (
    <div>
      <img
        src={url}
        className="max-w-screen md:max-w-[50vw] mx-auto my-5 object-contain"
      />
    </div>
  );
};

export default ViewFile;
