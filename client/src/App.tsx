import React, { useState, useRef, useEffect } from "react";
import UploadZone from "./components/UploadZone";
import FormatSelector from "./components/FormatSelector";
import QualitySlider from "./components/QualitySlider";
import PreviewCard from "./components/PreviewCard";
import { convertImage } from "./services/api";

// --- Header with Centered Logo and Theme Toggle ---
const Header = ({ isDarkMode, onToggleTheme }: { isDarkMode: boolean; onToggleTheme: () => void }) => (
  <header style={{
    padding: '15px 0',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease'
  }}>
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px',
      position: 'relative'
    }}>
      <h2 style={{
        color: 'var(--primary)',
        margin: 0,
        cursor: 'pointer',
        fontSize: '1.8rem',
        fontWeight: 800,
        letterSpacing: '-0.03em'
      }}>
        PixelSwift
      </h2>

      <button
        onClick={onToggleTheme}
        style={{
          position: 'absolute',
          right: '20px',
          background: 'var(--input-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '8px 16px',
          cursor: 'pointer',
          color: 'var(--text-main)',
          fontSize: '14px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer style={{
    marginTop: 'auto',
    padding: '40px 0',
    textAlign: 'center',
    borderTop: '1px solid var(--border-color)',
    color: 'var(--text-muted)',
    fontSize: '13px',
    background: 'var(--card-bg)',
    transition: 'all 0.3s ease'
  }}>
    <p>© 2026 PixelSwift Image Converter. Built with React & Sharp Engine.</p>
  </footer>
);

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const apiRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleConvert = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const blob = await convertImage(file, format, quality);
      const url = window.URL.createObjectURL(blob);
      const downloadExt = format === 'psd' ? 'tiff' : format;

      const link = document.createElement("a");
      link.href = url;
      link.download = `pixelswift-${Date.now()}.${downloadExt}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setHistory((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url,
          format: downloadExt.toUpperCase(),
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev,
      ]);
    } catch (error) {
      alert("Conversion failed. Ensure your local server is running on port 5000 and the format is supported.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s ease' }}>
      
      {/* ANIMATED BACKGROUND LAYER REMOVED */}

      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="container" ref={homeRef}>
        <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '30px' }}>
          <h1 style={{ fontSize: '3.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '15px', letterSpacing: '-0.02em' }}>
            Convert with <span style={{ color: 'var(--primary)' }}>Precision.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>The ultimate tool for high-fidelity image conversion.</p>
        </div>

        <div className="card">
          <UploadZone onFileSelect={setFile} />
          {file && (
            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <PreviewCard file={file} />
              <div style={{ background: 'var(--input-bg)', padding: '25px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <FormatSelector format={format} setFormat={setFormat} />
                <div style={{ marginTop: '25px' }}>
                  <QualitySlider quality={quality} setQuality={setQuality} />
                </div>
                <button
                  className="button"
                  onClick={handleConvert}
                  disabled={loading}
                  style={{ width: '100%', marginTop: '30px', height: '50px', fontSize: '16px' }}
                >
                  {loading ? "Processing..." : "Generate Download"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity Section */}
        {history.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ marginBottom: '25px', color: 'var(--text-main)' }}>Recent Activity</h3>
            {history.map((item) => (
              <div key={item.id} className="card" style={{ padding: '15px 30px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '16px' }}>
                <span style={{ fontWeight: 500 }}>
                  {item.name} <span style={{ color: 'var(--primary)', marginLeft: '10px' }}>{item.format}</span>
                </span>
                <a href={item.url} download style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
                  Download Again ↓
                </a>
              </div>
            ))}
          </div>
        )}

        {/* API Section */}
        <div ref={apiRef} style={{ marginTop: '100px', padding: '40px', background: 'var(--text-main)', borderRadius: '24px', color: 'var(--bg-color)' }}>
          <h2 style={{ color: 'var(--primary)' }}>Developer API</h2>
          <p style={{ opacity: 0.8 }}>Integrate PixelSwift directly into your workflow with our REST API. Support for batch processing and custom compression algorithms coming soon.</p>
          <code style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', display: 'block', marginTop: '20px', color: 'var(--primary)' }}>
            POST /convert -H "Content-Type: multipart/form-data"
          </code>
        </div>

        {/* Help Section */}
        <div ref={helpRef} style={{ marginTop: '100px', marginBottom: '100px' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--text-main)' }}>How can we help?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
            <div className="card">
              <h4>Supported Formats</h4>
              <p>
                We support standard (PNG, JPEG, WEBP) and professional formats (TIFF, AVIF, ICO).
                PSD requests are handled via high-fidelity TIFF export for Photoshop compatibility.
              </p>
            </div>
            <div className="card">
              <h4>Quality Control</h4>
              <p>
                Use the quality slider to balance file size and visual fidelity. 80% is recommended for web use.
                For ICO files, we automatically optimize for 256×256 resolution.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;