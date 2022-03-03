import React  from "react";


const TableHeader = () => {
  const tableHeader = ['Название', 'Оценка', 'Дата', 'Описание'];

  return (
    <thead className='table__header'>
      <tr className='table__header-row'>
        {tableHeader.map((item, index) => {
          return (
            <td className='table__cell' key={index}>
              {item}
            </td>
          );
        })}
      </tr>
    </thead>
  );
};


export default TableHeader;