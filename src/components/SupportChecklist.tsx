import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle, Calendar, Users, FileText, Heart } from 'lucide-react';
import { ChecklistItem } from '../types';

interface SupportChecklistProps {
  riskLevel: 'low' | 'medium' | 'high';
}

const SupportChecklist: React.FC<SupportChecklistProps> = ({ riskLevel }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const baseItems: ChecklistItem[] = [
      {
        id: '1',
        title: 'Schedule Medical Consultation',
        description: 'Book an appointment with a dermatologist within the recommended timeframe',
        completed: false,
        priority: riskLevel === 'high' ? 'high' : riskLevel === 'medium' ? 'medium' : 'low'
      },
      {
        id: '2',
        title: 'Document Current State',
        description: 'Take clear photos and note size, color, and any changes',
        completed: false,
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Gather Medical History',
        description: 'Compile family history of skin cancer and previous skin issues',
        completed: false,
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Sun Protection Plan',
        description: 'Implement daily sunscreen use and protective clothing',
        completed: false,
        priority: 'high'
      },
      {
        id: '5',
        title: 'Support System Setup',
        description: 'Inform family/friends and consider joining support groups',
        completed: false,
        priority: 'low'
      }
    ];

    if (riskLevel === 'high') {
      baseItems.push(
        {
          id: '6',
          title: 'Emergency Contact List',
          description: 'Prepare list of emergency contacts and medical information',
          completed: false,
          priority: 'high'
        },
        {
          id: '7',
          title: 'Insurance Verification',
          description: 'Verify insurance coverage for dermatology and potential treatments',
          completed: false,
          priority: 'medium'
        }
      );
    }

    return baseItems;
  });

  const toggleItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Calendar className="h-4 w-4" />;
      case 'low': return <Heart className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-medical-900">Support Action Checklist</h3>
        </div>
        <div className="text-sm text-medical-600">
          {completedCount} of {checklist.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-medical-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-medical-200 rounded-full h-3">
          <div 
            className="bg-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              item.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-medical-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleItem(item.id)}
                className="mt-1 text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                {item.completed ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${
                    item.completed ? 'text-green-800 line-through' : 'text-medical-900'
                  }`}>
                    {item.title}
                  </h4>
                  
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${
                    getPriorityColor(item.priority)
                  }`}>
                    {getPriorityIcon(item.priority)}
                    <span className="capitalize">{item.priority}</span>
                  </div>
                </div>
                
                <p className={`text-sm ${
                  item.completed ? 'text-green-600' : 'text-medical-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {completedCount === checklist.length && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Checklist Complete!</h4>
              <p className="text-green-700 text-sm">
                You've completed all recommended actions. Stay proactive about your skin health.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="mt-6 pt-6 border-t border-medical-200">
        <h4 className="font-semibold text-medical-900 mb-3">Need Help?</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <a
            href="#"
            className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <FileText className="h-4 w-4" />
            <span>Download Checklist PDF</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            <Users className="h-4 w-4" />
            <span>Find Support Groups</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportChecklist;