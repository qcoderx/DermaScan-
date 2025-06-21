import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Calendar, Target, Eye } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="h-6 w-6" />;
      case 'medium': return <AlertCircle className="h-6 w-6" />;
      case 'low': return <CheckCircle className="h-6 w-6" />;
      default: return <Eye className="h-6 w-6" />;
    }
  };

  const getRiskMessage = (risk: string) => {
    switch (risk) {
      case 'high': return 'High Risk - Immediate Medical Attention Recommended';
      case 'medium': return 'Medium Risk - Schedule Dermatologist Consultation';
      case 'low': return 'Low Risk - Continue Regular Monitoring';
      default: return 'Analysis Complete';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Assessment */}
      <div className={`card border-2 ${getRiskColor(result.riskLevel)}`}>
        <div className="flex items-center space-x-4 mb-4">
          {getRiskIcon(result.riskLevel)}
          <div>
            <h3 className="text-xl font-bold">{getRiskMessage(result.riskLevel)}</h3>
            <p className="text-sm opacity-75">Confidence: {result.confidence}%</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span>Analysis Confidence</span>
            <span className="font-semibold">{result.confidence}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mt-2">
            <div 
              className="bg-current h-2 rounded-full transition-all duration-500"
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Findings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-medical-900">Key Findings</h3>
          </div>
          <ul className="space-y-3">
            {result.findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-primary-100 p-1 rounded-full mt-0.5">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                </div>
                <span className="text-medical-700">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Immediate Recommendations */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-medical-900">Immediate Actions</h3>
          </div>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-medical-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analysis Details */}
      <div className="card bg-medical-50">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-medical-600" />
          <h3 className="text-lg font-semibold text-medical-900">Analysis Details</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-medical-600">Analysis ID:</span>
            <p className="font-mono text-medical-900">{result.id}</p>
          </div>
          <div>
            <span className="text-medical-600">Timestamp:</span>
            <p className="text-medical-900">{result.timestamp.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-medical-600">AI Model:</span>
            <p className="text-medical-900">DermaScan v2.1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;