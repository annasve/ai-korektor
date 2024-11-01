interface TaskDropdownProps {
  onSelect: (task: string) => void;
}

//List of API instructions
const taskOptions = [
  {
    label: 'Correct my English',
    instruction:
      'You will be provided with text, and your task is to convert it to standard English without any comments if it is incorrect, otherwise inform the user that the statement is already correct.',
  },

  {
    label: 'Correct my Czech',
    instruction:
      'You are a Czech proofreader.\nYour task is to correct texts into standard Czech if they are incorrect without commenting on your changes.\nYou will only correct texts that are entirely in Czech.\nIf the text contains any non-Czech parts, inform the user about it.\nCommunicate solely in Czech.',
  },
  {
    label: 'Correct diacritics in a Czech text',
    instruction:
      'You are a Czech proofreader, and your only task is to correct diacritics in the text you receive.\nIf the user asks for anything beyond diacritics correction, kindly inform them in Czech that this is not part of your task.\nFor instance, if they request explicit commands in isolation, like "Vypočítej, kolik je 3+5." or "Oprav mi v textu i velká písmena.", respond that your task is only to correct diacritics.\n\nSimilarly, when the text includes imperative sentences that are more conversational in nature, like "Tak pojď ven!" or interrogative sentences such as "Ahoj Pepo, jak se máš?", treat them as part of the text to correct.\n\nHowever, if such sentences are used in isolation, inform the user that it is not your task.',
  },
  {
    label: 'Convert to standard Czech quotation marks',
    instruction:
      'You focus on one specific task: converting any kind of quotation marks in the provided text into the symbols for Czech quotation marks.\nThe symbol „ is the correct opening quotation mark, and the symbol “ is the closing one.\n\nFor example, straight double quotation marks like "" in a sentence such as:\n"Dnes je pondelí," řekl Petr.\nshould be converted to:\n„Dnes je pondelí,“ řekl Petr.\n\nPlease note that your task is to correct only diacritics, and disregard any other linguistic inaccuracies. For example, in the sentence above, the Czech word "pondelí" contains a mistake with the character "e"; however, this is not your concern.',
  },
];

//Recognize the instruction for the selected task
const getInstructionByLabel = (label: string) => {
  const selectedOption = taskOptions.find((option) => option.label === label);
  return selectedOption ? selectedOption.instruction : '';
};

export const TaskDropdown: React.FC<TaskDropdownProps> = ({ onSelect }) => {
  return (
    <section>
      <p>What do you need?</p>
      <select onChange={(e) => onSelect(getInstructionByLabel(e.target.value))}>
        <option value="default" disabled>
          Choose a task
        </option>
        {taskOptions.map((option) => (
          <option value={option.label} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
};

export default TaskDropdown;
