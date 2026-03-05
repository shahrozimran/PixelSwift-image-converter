import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use(express.json());

const uploadDir = path.resolve(__dirname, "../uploads");
const convertedDir = path.resolve(__dirname, "../converted");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(convertedDir)) fs.mkdirSync(convertedDir, { recursive: true });

const upload = multer({ dest: uploadDir });

app.post("/convert", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
    let outputPath = ""; 
    const file = req.file;

    try {
        let { format, quality } = req.body;
        if (!file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        let targetFormat = format.toLowerCase();
        
        // --- PSD Fallback Logic ---
        // Sharp cannot write .psd, so we export as .tiff for Photoshop compatibility
        let fileExtension = targetFormat;
        if (targetFormat === 'psd') {
            fileExtension = 'tiff';
        }

        outputPath = path.join(convertedDir, `converted-${Date.now()}.${fileExtension}`);
        const transformer = sharp(file.path);

        if (targetFormat === 'svg') {
            const buffer = await transformer.toFormat('png', { quality: parseInt(quality) || 80 }).toBuffer();
            const base64 = buffer.toString('base64');
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><image href="data:image/png;base64,${base64}" width="100%" height="100%" /></svg>`;
            fs.writeFileSync(outputPath, svgContent);
        } else if (targetFormat === 'ico') {
            await transformer
                .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .toFormat('png')
                .toFile(outputPath);
        } else {
            // Logic for PNG, JPEG, WEBP, TIFF, AVIF, and PSD (via TIFF)
            await transformer
                .toFormat(fileExtension as keyof sharp.FormatEnum, { 
                    quality: parseInt(quality) || 80 
                })
                .toFile(outputPath);
        }

        res.download(outputPath, `converted.${fileExtension}`, (err) => {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            if (err) console.error("Download error:", err);
        });

    } catch (error: any) {
        console.error("Conversion error:", error.message);
        if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
        res.status(500).json({ error: "Processing Error", details: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));