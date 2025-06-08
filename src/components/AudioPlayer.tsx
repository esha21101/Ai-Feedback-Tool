// components/AudioPlayer.tsx

import React from 'react';

interface Props {
  fileUrl: string;
}

export default function AudioPlayer({ fileUrl }: Props) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <audio controls>
        <source src={fileUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
