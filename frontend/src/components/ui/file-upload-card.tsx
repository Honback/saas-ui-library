import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface FileUploadCardProps {
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUploadCard({ onFileSelect, className }: FileUploadCardProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={cn(
        'relative max-w-[330px] overflow-hidden rounded-2xl bg-white text-gray-900',
        className
      )}
      style={{ boxShadow: '0px 100px 48px -60px rgba(0,0,0,0.1)' }}
    >
      {/* Close button */}
      <button className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white transition-colors hover:bg-orange-700">
        <X className="h-4 w-4" />
      </button>

      <div className="p-4">
        <h3 className="text-center text-xl font-semibold">Upload a File</h3>
        <p className="mt-1 text-center text-sm leading-tight">
          Select a file to upload from your computer or device.
        </p>

        {/* Upload area */}
        <div className="mt-4">
          <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-50">
            Choose File
            <input ref={inputRef} type="file" className="hidden" onChange={handleFile} />
          </label>
        </div>

        {/* File result */}
        {fileName && (
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-blue-50 p-3">
            <span className="text-sm font-light">{fileName}</span>
            <button
              onClick={handleRemove}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-800/20 text-sm font-bold text-white transition-colors hover:bg-red-500/70"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
