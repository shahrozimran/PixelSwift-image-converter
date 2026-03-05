# PixelSwift 🚀 | Professional Image Converter

**PixelSwift** is a high-fidelity, full-stack image conversion tool designed for speed, precision, and privacy. Built with a modern React frontend and a robust Node.js backend, it allows users to convert images between multiple formats while maintaining granular control over output quality.



---

## 🛠 Tech Stack

### Frontend
* **React & TypeScript**: For a type-safe, component-based user interface.
* **Axios**: Handles asynchronous API requests to the processing server.
* **CSS3**: Custom modern light/dark theme with glassmorphism effects.

### Backend
* **Node.js & Express**: Scalable server-side architecture.
* **Sharp**: High-performance Node.js image processing library for fast conversions.
* **Multer**: Middleware for handling `multipart/form-data` (image uploads).

---

## ✨ Features

- **Multi-Format Support**: Convert images to **PNG, JPEG, WEBP, TIFF, and AVIF**.
- **Quality Optimization**: Integrated slider to balance file size and visual fidelity.
- **Adaptive UI**: Fully functional **Dark Mode** and **Light Mode** for a better user experience.
- **Download History**: Local session tracking of converted files for quick re-downloads.
- **Privacy Centric**: Images are processed locally and wiped from the server after conversion.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v16.x or higher)
* **npm** or **yarn**

### Installation

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/shahrozimran/PixelSwift-image-converter.git](https://github.com/shahrozimran/PixelSwift-image-converter.git)
   cd PixelSwift-image-converter

   ### How to Save This:
1.  In **VS Code**, open your `README.md` file in the root folder.
2.  Delete everything currently in there.
3.  Paste the code above.
4.  **Push to GitHub:**
    * `git add README.md`
    * `git commit -m "Add professional detailed README"`
    * `git push`

**Would you like me to help you add a "Demo" video or GIF to this README to show the converter in action?**

## 🔒 Security & Performance

As a student of **Cybersecurity and Ethical Hacking**, I have implemented several security-focused practices within this application:

* **Input Validation**: The backend strictly validates MIME types to ensure only valid image files are processed, mitigating potential malicious file injection.
* **Storage Management**: To prevent data accumulation and ensure privacy, converted files and temporary uploads are automatically purged from server storage immediately following the download completion.
* **Local Processing**: By avoiding third-party APIs for the conversion logic, user data remains entirely within the controlled local environment, preventing external data leaks.

---

## 👨‍💻 Author

**Shahroz Imran** *BS in Artificial Intelligence Student at the University of Central Punjab (UCP)*  
*AI Automation & E-commerce Expert*

* **GitHub**: [@shahrozimran](https://github.com/shahrozimran)
* **Professional Background**: Specialist in creating automated workflows (n8n, Zapier) and managing e-commerce operations like **Modenzas**.