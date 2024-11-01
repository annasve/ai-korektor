import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';

import './App.css';

import { KeyInput } from './components/KeyInput/KeyInput';
import { ChatComponent } from './components/ChatComponent/ChatComponent';

import { IMessage } from './types/types';
import { TaskDropdown } from './components/TaskDropdown/TaskDropdown';

export const App: React.FC = () => {
  const [userKey, setUserKey] = useState('');
  const [input, setInput] = useState('');
  const [taskInstruction, setTaskInstruction] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  //Dropdown actions
  const handleTaskSelect = (instruction: string) => {
    setTaskInstruction(instruction);
    setSentMessage(''); // Clears out the previous message
  };

  //API call handler
  useEffect(() => {
    const sendMessage = async () => {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
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
                content: taskInstruction,
              },
              { role: 'user', content: sentMessage },
            ],
          }),
        },
      );

      const dataOut = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: dataOut.choices[0].message.content },
      ]);
    };

    if (sentMessage) {
      // Only call if sentMessage is not empty
      sendMessage();
    }
  }, [sentMessage, userKey, taskInstruction]);

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="card">
        <h2>Use chatGPT for text corrections! ✨</h2>
        <KeyInput keyValue={userKey} onInput={setUserKey} />
        <TaskDropdown onSelect={handleTaskSelect} />
        <ChatComponent
          messages={messages}
          input={input}
          onInput={setInput}
          onSend={() => setSentMessage(input)}
        />
      </div>
    </>
  );
};

export default App;
