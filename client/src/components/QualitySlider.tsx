import React from "react";

interface Props {
  quality: number;
  setQuality: (value: number) => void;
}

export default function QualitySlider({ quality, setQuality }: Props) {
  return (
    <div className="control-group">
      <div className="label-row">
        <label>Image Quality</label>
        <span className="quality-value">{quality}%</span>
      </div>
      <input
        className="slider"
        type="range"
        min="10"
        max="100"
        step="1"
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
      />
    </div>
  );
}