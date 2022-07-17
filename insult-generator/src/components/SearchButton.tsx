import { useState } from 'react';
import { getInsult } from '../api/api';

type AppProps = {
  isDisabled: boolean;
  setIsDisabled: any;
  userName: string;
  eventValue: string;
  setEventValue: any;
};

export const SearchButton = ({
  userName,
  isDisabled,
  setIsDisabled,
  eventValue,
  setEventValue,
}: AppProps) => {
  const [text, setText] = useState('');
  const handleOnClick = () => {
    getInsult().then((insult: string) => {
      setText(insult);
    });
  };

  const handleClearOnClick = () => {
    setText('');
    setEventValue(eventValue ? '' : '');
    setIsDisabled(true);
  };

  const output = text && userName ? `${userName}, ${text}` : '';
  const loadButtonLabel = 'Load Insult';
  const clearButtonLabel = 'Clear';

  return (
    <div>
      <button onClick={handleOnClick} disabled={isDisabled}>
        {loadButtonLabel}
      </button>{' '}
      <button onClick={handleClearOnClick} disabled={isDisabled}>
        {clearButtonLabel}
      </button>
      <p>{output}</p>
    </div>
  );
};
