import React, { useEffect, useImperativeHandle, useState } from "react";
import _uniqueId from "lodash/uniqueId";

import style from "./styles.module.css";

const MyComp = (props) => {
  const { onClick, data } = props;
  return (
    <div className={style.myComp} onClick={onClick}>
      {data}
    </div>
  );
};

const MainGridComp = (props, ref) => {
  const [grid, setGrid] = useState([]);

  // eslint-disable-next-line no-unused-vars
  // useEffect(() => {
  //   for (let i = 0; i < 3; i++) addRow();
  //   for (let i = 0; i < 3; i++) addCol();
  // }, [grid]);

  const addRow = () => {
    let len = grid[0]?.length || 1;
    const newRow = [];
    while (len--) newRow.push(_uniqueId("g-"));
    const newGrid = [...grid, newRow];
    setGrid(newGrid);
  };

  const addCol = () => {
    const newGrid = [...grid];
    newGrid.forEach((item) => {
      item.push(_uniqueId("g-"));
    });
    setGrid(newGrid);
  };

  const handleAddRow = () => {
    addRow();
  };

  const handleAddCol = () => {
    addCol();
  };

  // useImperativeHandle(ref, () => ({
  //   hello: () => {
  //     console.log("Hello");
  //   },
  // }));

  const gridClick = (data) => {
    console.log(":::data", data);
  };

  return (
    <>
      <button onClick={handleAddRow}>add row</button>
      <button onClick={handleAddCol}>add col</button>
      <table className={style.table}>
        <tbody>
          {grid.map((row, id) => (
            <tr key={`${id}`} className={style.tableRow}>
              {row.map((col) => (
                <td
                  key={`${id}-${col}`}
                  data-id={col}
                  className={style.tableData}
                >
                  <MyComp
                    data={col}
                    onClick={() => gridClick(`${id}-${col}`)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const MainGrid = React.forwardRef(MainGridComp);

export default MainGrid;
