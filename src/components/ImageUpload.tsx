import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Image as ImageIcon } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onAnalysisComplete, 
  onStartAnalysis, 
  isAnalyzing 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    onStartAnalysis();
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        id: Date.now().toString(),
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        findings: [
          'Irregular border detected',
          'Color variation observed',
          'Asymmetrical shape noted',
          'Size: approximately 6mm diameter'
        ],
        recommendations: [
          'Schedule dermatologist consultation within 2 weeks',
          'Monitor for changes in size, color, or shape',
          'Avoid sun exposure to the affected area',
          'Document with photos for comparison'
        ],
        timestamp: new Date(),
        imageUrl: selectedImage || undefined
      };
      
      onAnalysisComplete(mockResult);
    }, 3000);
  };

  if (isAnalyzing) {
    return (
      <div className="card text-center py-12">
        <div className="scan-animation mb-6">
          <div className="bg-primary-100 p-4 rounded-full inline-block">
            <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-medical-900 mb-2">Analyzing Image...</h3>
        <p className="text-medical-600 mb-4">Our AI is carefully examining your image</p>
        <div className="w-64 bg-medical-200 rounded-full h-2 mx-auto">
          <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`card border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-medical-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {selectedImage ? (
          <div className="text-center">
            <img
              src={selectedImage}
              alt="Selected for analysis"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md mb-4"
            />
            <p className="text-medical-600 mb-4">Image ready for analysis</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary"
              >
                Choose Different Image
              </button>
              <button
                onClick={simulateAnalysis}
                className="btn-primary"
              >
                Start Analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-medical-100 p-4 rounded-full inline-block mb-4">
              <ImageIcon className="h-12 w-12 text-medical-400" />
            </div>
            <h3 className="text-xl font-semibold text-medical-900 mb-2">Upload Skin Image</h3>
            <p className="text-medical-600 mb-6">
              Drag and drop an image here, or click to select a file
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Choose File</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary flex items-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Take Photo</span>
              </button>
            </div>
            <p className="text-sm text-medical-500 mt-4">
              Supported formats: JPG, PNG, WebP (Max 10MB)
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Tips for Best Results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure good lighting and clear focus</li>
          <li>• Include a ruler or coin for size reference</li>
          <li>• Capture the entire lesion and surrounding skin</li>
          <li>• Avoid shadows and reflections</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;