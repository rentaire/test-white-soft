import React from 'react';

import { observer } from 'mobx-react-lite';

const InputField = observer(({ element, className, changeData }) => {
  return (
    <input
      className={className}
      name={element.name}
      placeholder={element.placeholder}
      required={element.required}
      type={element.type}
      pattern={element.pattern}
      value={element.value}
      onChange={(event) => changeData(event, element)}
    />
  );
});

export default InputField;
