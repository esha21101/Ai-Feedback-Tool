// src/components/Results.tsx
'use client';

import React from 'react';
import { FeedbackResponse } from '../types/evaluation';

interface ResultsProps {
  result: FeedbackResponse;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  if (!result || !result.scores) {
    return <p>No result data available.</p>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Evaluation Results</h2>

      <div className="space-y-2">
        {Object.entries(result.scores).map(([category, score]) => (
          <div key={category} className="flex justify-between border-b pb-1">
            <span className="capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
            <span className="font-medium">{score}</span>
          </div>
        ))}
      </div>

      {result.overallFeedback && (
        <p className="mt-4 italic text-sm text-gray-700">
          <strong>Feedback:</strong> {result.overallFeedback}
        </p>
      )}

      {result.observation && (
        <p className="italic text-sm text-gray-700">
          <strong>Observation:</strong> {result.observation}
        </p>
      )}
    </div>
  );
};

export default Results;
