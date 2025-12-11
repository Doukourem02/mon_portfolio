"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function CVPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV_DOUKOURE_Mohamed.pdf";
    link.download = "CV_DOUKOURE_Mohamed.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg hover:text-blue-400 transition-colors"
          >
            ← Retour
          </motion.a>
          <motion.button
            onClick={handleDownload}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Télécharger le CV
          </motion.button>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-80px)]">
        {isClient && (
          <iframe
            src="/CV_DOUKOURE_Mohamed.pdf"
            className="w-full h-full border-0"
            title="CV Mohamed DOUKOURE"
          />
        )}
      </div>
    </div>
  );
}

