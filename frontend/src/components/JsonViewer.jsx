// src/components/JsonViewer.jsx
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const JsonViewer = ({ data }) => {
  const content = JSON.stringify(data, null, 2);

  return (
    // The h-[400px] or similar height class on the parent is important for ScrollArea to work
    <ScrollArea className="h-full w-full rounded-md bg-slate-900 text-slate-200 font-mono text-sm p-4">
      <pre><code>{content}</code></pre>
    </ScrollArea>
  );
};

export default JsonViewer;