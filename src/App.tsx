import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';

import './App.css';

interface IMessages {
  role: string;
  content: string;
}

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [userKey, setUserKey] = useState('');
  const [keyInput, setKeyInput] = useState('');

  //TODO more custom prompts for other tasks

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
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
                text: 'You will be provided with text, and your task is to convert it to standard English without any comments if it is incorrect, otherwise inform the user that the statement is already correct.',
              },
            ],
          },
          { role: 'user', content: input },
        ],
      }),
    });

    const dataOut = await response.json();
    console.log(dataOut);

    setMessages([
      ...messages,
      { role: 'assistant', content: dataOut.choices[0].message.content },
    ]);
  };

  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserKey(e.target.value);
    setKeyInput(e.target.value);
  };

  const clearKey = () => {
    setKeyInput('');
  };

  const replyTextRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = () => {
    if (replyTextRef.current) {
      const textToCopy = replyTextRef.current.innerText;
      navigator.clipboard.writeText(textToCopy);
    }
  };

  return (
    <>
      <p>Use chatGPT for text corrections! ✨</p>
      <section className="key">
        <p>
          First, enter your{' '}
          <a href="https://platform.openai.com/api-keys" target="_blank">
            key
          </a>{' '}
          to start
        </p>
        <input value={keyInput} type="text" onChange={handleKey} />
        <button onClick={clearKey}>Let's start!</button>
      </section>
      <div className="query-box text-box">
        <textarea
          className="query-text"
          value={input}
          onChange={handleInputChange}
          rows={4}
          placeholder="Insert your text here..."
        />
        <button className="button-send" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      <div className={`reply-box text-box ${input ? 'hide-placeholder' : ''}`}>
        {messages.map((message, index) => (
          <div ref={replyTextRef} className="reply-message" key={index}>
            {message.content}
            <button className="button-copy" onClick={copyToClipboard}>
              <img src="/content_copy-icon-google.svg" alt="copy" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="card">
        <ChatComponent />
      </div>
    </>
  );
}

export default App;
