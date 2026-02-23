import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/shared/code-block';

interface CodeViewerProps {
  code: string;
  usageCode: string;
}

type TabType = 'usage' | 'source';

export function CodeViewer({ code, usageCode }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('usage');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'usage' ? usageCode : code;

  async function handleCopy() {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Tabs + Copy button */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab('usage')}
            className={cn(
              'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'usage'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            Usage Example
          </button>
          <button
            onClick={() => setActiveTab('source')}
            className={cn(
              'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'source'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            Full Source
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              복사
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="max-h-[600px] overflow-y-auto">
        <CodeBlock code={currentCode} language="tsx" />
      </div>
    </div>
  );
}
