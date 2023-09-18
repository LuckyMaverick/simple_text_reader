import React, { useState, useEffect } from 'react';

function TTS() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1); // Default speed is 1
  const [volume, setVolume] = useState(1); // Default volume is 1
  const [pitch, setPitch] = useState(1); // Default pitch is 1
  const [speaking, setSpeaking] = useState(false); // Track whether speech is in progress
  const [voices, setVoices] = useState([]); // Available speech synthesis voices
  const [selectedVoice, setSelectedVoice] = useState(null); // Currently selected voice
  
  let utterance = null; // Reference to the SpeechSynthesisUtterance object
  
  useEffect(() => {
    // Add an event listener to get voices when they are available
    window.speechSynthesis.onvoiceschanged = () => {
      const synth = window.speechSynthesis;
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      // Set a default voice (you can change this to your preferred voice)
      setSelectedVoice(availableVoices[0]);
    };
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  
  const handleSpeak = () => {
    if (!speaking) {
      utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed; // Set the speech rate based on the selected speed
      utterance.volume = volume; // Set the speech volume
      utterance.pitch = pitch; // Set the speech pitch
      if (selectedVoice) {
        utterance.voice = selectedVoice; // Set the selected voice
      }
      utterance.onend = () => {
        setSpeaking(false); // When speech ends, set speaking to false
      };
      speechSynthesis.speak(utterance);
      setSpeaking(true); // Set speaking to true
    }
  };
  
  const handleStop = () => {
    if (speaking) {
      speechSynthesis.cancel(); // Stop the speech synthesis
      setSpeaking(false); // Set speaking to false
    }
  };
  
  const handleVoiceChange = (event) => {
    // Update the selected voice based on user input
    const voiceName = event.target.value;
    const selected = voices.find((voice) => voice.name === voiceName);
    setSelectedVoice(selected);
  };
  
  return (
    <div className="container">
      <textarea
        className="textarea"
        placeholder="Enter text to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="select">
        <label htmlFor="speed">Select Speed:</label>
        <select
          id="speed"
          className="speed-select"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        >
          <option value="0.1">0.1x</option>
          <option value="0.5">0.5x</option>
          <option value="1">1x (Normal)</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
      <div className="select">
        <label htmlFor="volume">Select Volume:</label>
        <select
          id="volume"
          className="volume-select"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        >
          <option value="0">0</option>
          <option value="0.2">0.2</option>
          <option value="0.4">0.4</option>
          <option value="0.6">0.6</option>
          <option value="0.8">0.8</option>
          <option value="1">1 (Max)</option>
        </select>
      </div>
      <div className="select">
        <label htmlFor="pitch">Select Pitch:</label>
        <select
          id="pitch"
          className="pitch-select"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
        >
          <option value="0.5">0.5</option>
          <option value="0.75">0.75</option>
          <option value="1">1 (Normal)</option>
          <option value="1.25">1.25</option>
          <option value="1.5">1.5</option>
        </select>
      </div>
      <div className="select">
        <label htmlFor="voice">Select Voice:</label>
        <select
          id="voice"
          className="voice-select"
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={handleVoiceChange}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button className="button" onClick={handleSpeak}>
          Speak
        </button>
        <button className="button stop-button" onClick={handleStop}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default TTS;
