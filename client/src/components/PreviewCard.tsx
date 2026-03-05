interface Props {
  file: File;
}

export default function PreviewCard({ file }: Props) {
  return (
    <div className="card">
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <p>{file.name}</p>
    </div>
  );
}