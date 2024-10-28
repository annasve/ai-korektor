import { useState } from 'react';

interface KeyInputProps {
  keyValue: string;
  onInput: (value: string) => void;
}

export const KeyInput: React.FC<KeyInputProps> = ({ keyValue, onInput }) => {
  const [inputVisible, setInputVisible] = useState(true);

  //Store user key for API
  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value); //Update the keyValue in the parent
  };

  //Hide the key input section
  const hideInput = () => {
    setInputVisible(false);
  };

  return (
    <section className={inputVisible ? 'key' : 'hidden'}>
      <p>
        First, enter your{' '}
        <a href="https://platform.openai.com/api-keys" target="_blank">
          key
        </a>{' '}
        to start
      </p>
      <input type="password" value={keyValue} onChange={handleKey} />
      <button onClick={hideInput}>Let's start!</button>
    </section>
  );
};

export default KeyInput;
