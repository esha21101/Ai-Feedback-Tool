// components/FileUploader.tsx

import React, { useCallback, useRef } from 'react';

interface Props {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav')) {
      onFileSelect(file);
    } else {
      alert('Please upload a valid .mp3 or .wav file.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #00bfa6',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
        onClick={handleBrowseClick}
      >
        <p>Drag & drop your .mp3 or .wav file here</p>
        <p>or</p>
        <button
          type="button"
          style={{
            padding: '8px 16px',
            backgroundColor: '#00bfa6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Browse from device
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".mp3,.wav"
          style={{ display: 'none' }}
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
}
