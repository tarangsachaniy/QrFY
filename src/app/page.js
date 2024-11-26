'use client';
import { useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState(""); 
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [filename, setFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateQrCode = async (link) => {
    try {
      const qr = await QRCode.toDataURL(link);
      setQrCode(qr);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, url }),
    });

    if (res.ok) {
      const newUrl = await res.json();
      setSubmittedUrl(newUrl.data.url); 
      setFilename(newUrl.data.text || "qrcode"); 
      generateQrCode(newUrl.data.url);
      setText("");
      setUrl("");
      setIsFormVisible(false); 
      setErrorMessage(""); 
    } else {
      const error = await res.json();
      setErrorMessage(error.message || "An error occurred, please try again.");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${filename}.png`; 
    link.click();
    resetForm(); 
  };

  const resetForm = () => {
    setQrCode("");
    setSubmittedUrl("");
    setFilename("");
    setIsFormVisible(true); 
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Title */}
      <h1 className="text-center text-4xl font-medium tracking-tight md:text-7xl mb-8">
        Manage Your URLs
      </h1>

      {/* Form */}
      {isFormVisible && (
        <div className="mt-8 mx-auto max-w-lg px-4 sm:px-6 md:px-8">
          {errorMessage && (
            <div className="mt-4 text-red-600 text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-lg text-slate-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none transition duration-300"
              placeholder="Enter description"
              name="text"
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-lg text-slate-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none transition duration-300"
              placeholder="Enter URL"
              name="url"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-600 px-5 py-3 text-lg font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Display URL and QR Code */}
      {!isFormVisible && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-medium text-slate-200">Submitted URL:</h2>
          <p className="mt-2 text-slate-200">
            <a
              href={submittedUrl}
              className="text-blue-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {submittedUrl}
            </a>
          </p>
          {qrCode && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-200">QR Code:</h3>
              <img src={qrCode} alt="QR Code" className="mx-auto mt-4 w-40 h-40 border border-slate-300 shadow-md rounded-lg" />
              <button
                onClick={handleDownload}
                className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      )}

      <footer className="mt-8 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
}
