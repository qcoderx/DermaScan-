import React, { useState, useEffect } from 'react';
import { Sparkles, Home, ShoppingBag, UserCheck, ExternalLink, Loader2, MapPin, Star, Phone } from 'lucide-react';
import { AnalysisResult, GeminiRecommendation } from '../types';

interface GeminiRecommendationsProps {
  analysisResult: AnalysisResult;
}

const GeminiRecommendations: React.FC<GeminiRecommendationsProps> = ({ analysisResult }) => {
  const [recommendations, setRecommendations] = useState<GeminiRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateRecommendations();
  }, [analysisResult]);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate Gemini API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recommendations based on risk level
      const mockRecommendations: GeminiRecommendation = {
        homeRemedies: analysisResult.riskLevel === 'low' ? [
          'Apply aloe vera gel twice daily for soothing relief',
          'Use cold compress for 10-15 minutes to reduce inflammation',
          'Keep the area clean and dry',
          'Apply sunscreen SPF 30+ when going outdoors',
          'Stay hydrated and maintain a healthy diet rich in antioxidants'
        ] : [
          'Keep the area clean and avoid picking or scratching',
          'Apply gentle, fragrance-free moisturizer',
          'Use broad-spectrum sunscreen SPF 50+',
          'Document changes with photos',
          'Avoid harsh chemicals or treatments until professional evaluation'
        ],
        
        skincareProducts: [
          'CeraVe Healing Ointment - For barrier protection',
          'La Roche-Posay Anthelios Ultra Light Sunscreen SPF 60',
          'Vanicream Gentle Facial Cleanser - Fragrance-free',
          'Eucerin Advanced Repair Cream - For sensitive skin',
          'Neutrogena Ultra Gentle Daily Cleanser'
        ],
        
        dermatologists: [
          {
            name: 'Dr. Sarah Johnson, MD',
            specialty: 'Dermatology & Mohs Surgery',
            location: 'Downtown Medical Center',
            rating: 4.9,
            contact: '(555) 123-4567'
          },
          {
            name: 'Dr. Michael Chen, MD',
            specialty: 'Dermatopathology',
            location: 'Skin Health Institute',
            rating: 4.8,
            contact: '(555) 234-5678'
          },
          {
            name: 'Dr. Emily Rodriguez, MD',
            specialty: 'Pediatric & Adult Dermatology',
            location: 'Family Dermatology Clinic',
            rating: 4.7,
            contact: '(555) 345-6789'
          }
        ],
        
        supportResources: [
          'American Cancer Society - Skin Cancer Support Groups',
          'Skin Cancer Foundation - Educational Resources',
          'CancerCare - Free Counseling Services',
          'National Cancer Institute - Treatment Information',
          'Melanoma Research Foundation - Patient Support'
        ]
      };

      setRecommendations(mockRecommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card text-center py-8">
        <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
          <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-medical-900 mb-2">
          Generating Personalized Recommendations...
        </h3>
        <p className="text-medical-600">Our AI is creating tailored advice for your situation</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={generateRecommendations}
          className="btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!recommendations) return null;

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-bold text-purple-900">
            AI-Powered Personalized Recommendations
          </h2>
        </div>
        <p className="text-purple-700">
          Based on your analysis results, here are personalized recommendations to support your skin health journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Home Remedies */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Home className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-medical-900">Home Care Tips</h3>
          </div>
          <ul className="space-y-3">
            {recommendations.homeRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-green-100 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-medical-700 text-sm">{remedy}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skincare Products */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-medical-900">Recommended Products</h3>
          </div>
          <ul className="space-y-3">
            {recommendations.skincareProducts.map((product, index) => (
              <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <ShoppingBag className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-medical-900 font-medium text-sm block">
                    {product.split(' - ')[0]}
                  </span>
                  {product.includes(' - ') && (
                    <span className="text-medical-600 text-xs">
                      {product.split(' - ')[1]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dermatologists */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <UserCheck className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-medical-900">Recommended Dermatologists</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.dermatologists.map((doctor, index) => (
            <div key={index} className="bg-medical-50 rounded-lg p-4 border border-medical-200">
              <h4 className="font-semibold text-medical-900 mb-1">{doctor.name}</h4>
              <p className="text-sm text-medical-600 mb-2">{doctor.specialty}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-medical-500" />
                  <span className="text-medical-700">{doctor.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-medical-700">{doctor.rating}/5.0</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-medical-500" />
                  <span className="text-medical-700">{doctor.contact}</span>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 px-3 rounded-md transition-colors duration-200">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support Resources */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <ExternalLink className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-medical-900">Support Resources</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {recommendations.supportResources.map((resource, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 group"
            >
              <ExternalLink className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
              <span className="text-medical-700 text-sm group-hover:text-medical-900">
                {resource}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeminiRecommendations;