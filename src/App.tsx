import React, { useState } from 'react';
import { Camera, Upload, Brain, Heart, Shield, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import AnalysisResults from './components/AnalysisResults';
import GeminiRecommendations from './components/GeminiRecommendations';
import SupportChecklist from './components/SupportChecklist';
import { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
    if (result.riskLevel === 'high' || result.riskLevel === 'medium') {
      setShowRecommendations(true);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowRecommendations(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-medical-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-medical-900">DermaScan</h1>
                <p className="text-sm text-medical-600">AI-Powered Skin Cancer Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-medical-600">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisResult && !isAnalyzing && (
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-medical-900 mb-4">
              Early Detection Saves Lives
            </h2>
            <p className="text-xl text-medical-600 max-w-3xl mx-auto mb-8">
              Upload a photo of your skin concern and get instant AI-powered analysis with 
              personalized recommendations from our advanced Gemini AI system.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="card text-center">
                <Camera className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-medical-900 mb-2">Capture</h3>
                <p className="text-medical-600">Take or upload a clear photo of the skin area</p>
              </div>
              <div className="card text-center">
                <Brain className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-medical-900 mb-2">Analyze</h3>
                <p className="text-medical-600">AI analyzes patterns and characteristics</p>
              </div>
              <div className="card text-center">
                <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-medical-900 mb-2">Care</h3>
                <p className="text-medical-600">Get personalized recommendations and support</p>
              </div>
            </div>
          </div>
        )}

        {/* Image Upload Section */}
        {!analysisResult && (
          <div className="max-w-2xl mx-auto">
            <ImageUpload 
              onAnalysisComplete={handleAnalysisComplete}
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8 animate-slide-up">
            <AnalysisResults result={analysisResult} />
            
            {showRecommendations && (
              <>
                <GeminiRecommendations analysisResult={analysisResult} />
                <SupportChecklist riskLevel={analysisResult.riskLevel} />
              </>
            )}
            
            <div className="text-center">
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setShowRecommendations(false);
                }}
                className="btn-primary"
              >
                Analyze Another Image
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                This tool is for educational purposes only and should not replace professional medical advice. 
                Always consult with a qualified dermatologist or healthcare provider for proper diagnosis and treatment. 
                If you notice any changes in your skin, seek medical attention promptly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;