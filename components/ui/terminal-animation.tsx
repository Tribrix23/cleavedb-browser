"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sequence = [
  {
    type: "command",
    text: 'pour into users "david" {"name":"david"}',
  },
  {
    type: "output",
    text: `[
  {
    "gid": "users:david",
    "status": "ok"
  }
]`,
  },
  {
    type: "command",
    text: "scoop users",
  },
  {
    type: "output",
    text: `[
  {
    "count": 1,
    "documents": [
      {
        "body": {
          "name": "david"
        },
        "gid": "users:david"
      }
    ],
    "mode": "EVERYTHING",
    "status": "ok"
  }
]`,
  },
];

// Helper to colorize JSON output like the screenshot
function colorizeJson(jsonString: string) {
  return jsonString.split("\n").map((line, i) => {
    // Match keys: "something":
    let formattedLine = line.replace(/"([^"]+)":/g, '<span class="text-rose-600 font-medium">"$1"</span>:');
    // Match string values: "something" (but not keys)
    formattedLine = formattedLine.replace(/: "([^"]+)"/g, ': <span class="text-emerald-600">"$1"</span>');
    // Match number values
    formattedLine = formattedLine.replace(/: ([0-9]+)/g, ': <span class="text-orange-600">$1</span>');
    
    return (
      <div key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />
    );
  });
}

export function TerminalAnimation() {
  const [step, setStep] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever step or typedCommand changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [step, typedCommand]);

  useEffect(() => {
    if (step >= sequence.length) return;

    const currentAction = sequence[step];

    if (currentAction.type === "command") {
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex <= currentAction.text.length) {
          setTypedCommand(currentAction.text.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setStep((s) => s + 1);
            setTypedCommand("");
          }, 150);
        }
      }, 40);

      return () => clearInterval(typeInterval);
    } else if (currentAction.type === "output") {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 1000); // 1 second interval before next query starts
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="rounded-xl bg-transparent overflow-hidden flex flex-col h-[480px] font-mono text-xs md:text-sm">
      <div 
        ref={containerRef}
        className="flex-1 p-5 overflow-hidden flex flex-col gap-3 text-zinc-900"
        style={{ scrollBehavior: "smooth" }}
      >
        
        {sequence.slice(0, step).map((item, index) => {
          if (item.type === "command") {
            return (
              <div key={index} className="flex gap-2">
                <span className="text-blue-600 shrink-0 font-medium">david@cleavedb&gt;</span>
                <span className="text-zinc-900">{item.text}</span>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="whitespace-pre pl-1 text-zinc-800"
              >
                {colorizeJson(item.text)}
              </div>
            );
          }
        })}

        {/* Current typing step */}
        {step < sequence.length && sequence[step].type === "command" && (
          <div className="flex gap-2">
            <span className="text-blue-600 shrink-0 font-medium">david@cleavedb&gt;</span>
            <span className="text-zinc-900">
              {typedCommand}
              <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse ml-0.5 align-middle" />
            </span>
          </div>
        )}

        {/* Final blinking cursor when done */}
        {step >= sequence.length && (
          <div className="flex gap-2 mt-2">
            <span className="text-blue-600 shrink-0 font-medium">david@cleavedb&gt;</span>
            <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
