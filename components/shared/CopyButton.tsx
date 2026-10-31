'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  iconOnly?: boolean;
}

export function CopyButton({
  textToCopy,
  label = 'Copy Prompt',
  copiedLabel = 'Copied!',
  className,
  iconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers or restricted contexts
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Text copied to clipboard' : 'Copy prompt text to clipboard'}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none',
        copied
          ? 'bg-[#15803D] text-white shadow-sm ring-1 ring-[#15803D]'
          : error
            ? 'bg-rose-100 text-rose-800 ring-1 ring-rose-300'
            : 'bg-[#FFF0F5] hover:bg-[#FCE4EC] text-[#BE185D] hover:text-[#351827] ring-1 ring-[#F1D5E0]',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          {!iconOnly && <span>{copiedLabel}</span>}
        </>
      ) : error ? (
        <span>Press Ctrl+C</span>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {!iconOnly && <span>{label}</span>}
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}
