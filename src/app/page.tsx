'use client';

import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import AudioPlayer from '../components/AudioPlayer';
import Results from '../components/Results';
import { analyzeCall } from '../utils/api';
import { FeedbackResponse } from '../types/evaluation';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [result, setResult] = useState<FeedbackResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!audioFile) {
      setError('Please upload an audio file first.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await analyzeCall(audioFile);
      setResult(res);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Error analyzing audio.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
    setFileUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>AI Feedback Tool</h1>
        </div>

        <FileUploader onFileSelect={handleFileSelect} />

        {fileUrl && <AudioPlayer fileUrl={fileUrl} />}

        <div className={styles.buttonContainer}>
          <button onClick={handleProcess}>Process</button>
        </div>

        {loading && <p className={styles.loading}>Analyzing call... ⏳</p>}
        {error && <p className={styles.error}>{error}</p>}
        {result && (
          <div className={styles.resultsContainer}>
            <Results result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
