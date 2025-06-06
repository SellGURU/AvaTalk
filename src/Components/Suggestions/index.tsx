import React, { useState } from "react";

interface Props {
  suggestions: string[];
  theme?: string;
  title?:string
  onVSelectItem: (item: string | null) => void;
}

const Suggestions: React.FC<Props> = ({
  suggestions,
  theme,
  onVSelectItem,
  title
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onVSelectItem(item);
  };

  return (
    <>
      {!selectedItem && (
        <div className={`${theme}-Suggestions-container`}>
          <h1 className={`${theme}-Suggestions-title`}>
            {title}
          </h1>
          <ul className={`${theme}-Suggestions-list`}>
            {suggestions.map((item, index) => (
              <li
                className={`${theme}-Suggestions-listItem`}
                key={index}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* {selectedItem && (
        <p className={`${theme}-Suggestions-selected`}> {selectedItem}</p>
      )} */}
    </>
  );
};

Suggestions.defaultProps = {
  theme: "Acord",
};

export default Suggestions;
