import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const SpeechReader = ({ questions, onSpeechEnd }) => {
  const [index, setIndex] = useState(0);
  const { speak } = useSpeechSynthesis();

  const handleSpeakClick = (text) => {
    speak({ text });
  };

  const handleReadFromDataset = () => {
    const question = questions[index];
    if (question) {
      handleSpeakClick(question.question);
      setIndex(index + 1);
    } else {
      // No more questions, notify the parent component
      if (onSpeechEnd) {
        onSpeechEnd();
      }
    }
  };

  return (
    <div>
      <button onClick={handleReadFromDataset}>Read from Dataset</button>
    </div>
  );
};

export default SpeechReader;