import React from "react";

interface Props {
  format: string;
  setFormat: (value: string) => void;
}

export default function FormatSelector({ format, setFormat }: Props) {
  return (
    <div className="control-group">
      <label htmlFor="format-select">Convert to:</label>
      <select
        id="format-select"
        className="select"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <optgroup label="Standard Formats">
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </optgroup>
        <optgroup label="Specialized Formats">
          <option value="psd">PSD (Photoshop Document)</option>
          <option value="tiff">TIFF</option>
          <option value="avif">AVIF</option>
          <option value="ico">ICO (Icon)</option>
        </optgroup>
        <optgroup label="Advanced">
          <option value="svg">SVG (Raster Wrapper)</option>
        </optgroup>
      </select>
    </div>
  );
}