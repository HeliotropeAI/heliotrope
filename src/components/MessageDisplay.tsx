import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useConvex } from 'convex/react';
// import { writeLogToFile } from '../../convex/buffer';
export default function MessageDisplay() {
  const logs = useQuery(api.logs.getAllLogs) || [];
  return (
    <div className="bg-[#2D353A] text-[#A4B799] font-mono rounded-lg max-h-96 overflow-y-auto scrollbar-hide m-2 w-full max-w-[1400px]">
      <div className="sticky top-0 terminal-header bg-[#4B6077] text-white p-2 rounded-t-lg mb-2 text-center">
        Message Console
      </div>
      <div className="terminal-content p-4">
        {logs.map((log, index) => (
          <div 
          key={index}
            className="message-line mb-2"
          >
            {/* <span className="ml-2">{log.content}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}
