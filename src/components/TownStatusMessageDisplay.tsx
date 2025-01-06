import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { LOG_LEVELS } from '../types/messages';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;

export default function MessageDisplay() {
  const logs = useQuery(api.logs.getAllLogs) || [];
  const createStatus = useMutation(api.logs.createStatus);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const systemPrompt = `You are an AI story generator for a virtual town. No matter what input text you receive, your task is to create an engaging status update about the town and its AI inhabitants.

  IMPORTANT RULES:
  - ALWAYS generate a town status, regardless of input relevance
  - Focus on daily life, interactions, and events in the town
  - Include residents' names and their activities
  - Mention locations within the town
  - Mix routine activities with occasional unexpected events
  - Keep the tone light and slice-of-life
  - Length should be 1-2 sentences
  - Never say "no information" or "cannot generate"
  
  KEY ELEMENTS TO INCLUDE (mix and match):
  - Residents' interactions and conversations
  - Business activities in shops/markets
  - Social gatherings and events
  - Weather and time of day
  - Infrastructure changes or development
  - Visitors to the town
  - Random slice-of-life moments
  
  Example outputs:
  "Sarah from the bakery is sharing gossip with Old Tom while the morning fog rolls through Main Street, as Mayor Jenkins announces plans for the summer festival."
  
  "The town's new AI chips store is buzzing with activity as Dr. Williams demonstrates the latest neural enhancement, while children play virtual reality games in the town square."
  
  "Night falls on Pine Avenue as restaurant owner Lisa closes up, exchanging friendly waves with the evening patrol droids and discussing tomorrow's weather forecast with passing neighbors."
  
  Remember: Take ANY input and transform it into a living moment from this AI-inhabited town.`;

  const analyzeWithGPT = async (text: string, retryCount = 0) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Generate a town status update based on this input: ${text}` },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`GPT request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.choices[0].message.content;
      await createStatus({ status: result });
      
    } catch (error) {
      console.error('Error:', error);
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return analyzeWithGPT(text, retryCount + 1);
      }
    }
  };

  useEffect(() => {
    const runAnalysis = () => {
      if (logs.length > 0) {
        const recentLogs = logs.slice(0, 10)
          .map(log => `[${new Date(log.timestamp).toISOString()}] ${log.content}`)
          .join('\n');
        analyzeWithGPT(recentLogs);
      }
    };

    runAnalysis();
    timerRef.current = setInterval(runAnalysis, REFRESH_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [logs.length]);

  const statuses = useQuery(api.logs.getAllStatus) || [];

  return (
    <div className="bg-[#2D353A] text-[#A4B799] font-mono rounded-lg max-h-96 overflow-y-auto scrollbar-hide m-2 w-full max-w-[1400px]">
      <div className="sticky top-0 terminal-header bg-[#4B6077] text-white p-2 rounded-t-lg mb-2 text-center">
        Message Console
      </div>
      <div className="terminal-content p-4">
        {statuses.map((status) => (
          <div 
            key={status.id}
            className="message-line mb-2"
          >
            <span className="text-xs opacity-50">
              {new Date(status.timestamp).toLocaleTimeString()}
            </span>
            <span className="ml-2">{status.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}