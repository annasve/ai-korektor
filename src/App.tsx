import { useState } from 'react';
import reactLogo from './assets/react.svg';

import './App.css';

//--Messages interface
interface IMessages {
  role: string;
  content: string;
}

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [userKey, setUserKey] = useState('');
  const [keyInput, setKeyInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    // Make a request to the ChatGPT API with the user input
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: 'You will be provided with statements, and your task is to convert them to standard English if they are incorrect, otherwise inform the user that the statement is already correct.',
              },
            ],
          },
          { role: 'user', content: input },
        ],
      }),
    });

    const dataOut = await response.json(); // Extract the JSON data
    console.log(dataOut);

    // Update the conversation history with the response from ChatGPT
    setMessages([
      ...messages,
      { role: 'assistant', content: dataOut.choices[0].message.content },
    ]);

    // Clear the input field for prompts
    setInput('');
  };

  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserKey(e.target.value);
    setKeyInput(e.target.value);
  };

  const clearKey = () => {
    setKeyInput('');
  };

  return (
    <>
      <p>Use chatGPT for text corrections! ✨</p>
      <p>First, enter your key to start</p>
      <input value={keyInput} type="text" onChange={handleKey} />
      <button onClick={clearKey}>Let's start!</button>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="">
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <ChatComponent />
      </div>
    </>
  );
}

export default App;
