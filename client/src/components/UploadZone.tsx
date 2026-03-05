import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ onFileSelect }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) onFileSelect(acceptedFiles[0]);
    }
  });

  return (
    <div {...getRootProps()} className="card" style={{ textAlign: "center", cursor: "pointer" }}>
      <input {...getInputProps()} />
      <p>Drag & drop image here or click to select</p>
    </div>
  );
}