import { useRef } from 'react';

import { IMessage } from '../../types/types';
import './ChatComponent.css';

interface ChatComponentProps {
  input: string;
  onInput: (value: string) => void;
  onSend: () => void;
  messages: IMessage[];
}
export const ChatComponent: React.FC<ChatComponentProps> = ({
  input,
  onInput,
  onSend,
  messages,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInput(e.target.value);
  };

  //Copy a reply to clipboard
  const replyTextRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = () => {
    if (replyTextRef.current) {
      const textToCopy = replyTextRef.current.innerText;
      navigator.clipboard.writeText(textToCopy);
    }
  };

  return (
    <>
      <div className="query-box text-box">
        <textarea
          className="query-text"
          value={input}
          onChange={handleInputChange}
          rows={4}
          placeholder="Insert your text here..."
        />
        <button className="button-send" onClick={onSend}>
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
export default ChatComponent;
