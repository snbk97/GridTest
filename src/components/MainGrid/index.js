import React, { useEffect, useImperativeHandle, useState } from "react";
import _uniqueId from "lodash/uniqueId";

import style from "./styles.module.css";

const MainGridComp = (props, ref) => {
  const initState = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const [grid, setGrid] = useState([]);

  // eslint-disable-next-line no-unused-vars
  // useEffect(() => {
  //   for (let i = 0; i < 3; i++) addRow();
  //   for (let i = 0; i < 3; i++) addCol();
  // }, [grid]);

  const addRow = () => {
    let len = grid[0]?.length || 3;
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

  useImperativeHandle(ref, () => ({
    hello: () => {
      console.log("Hello");
    }
  }));

  return (
    <>
      <table className={style.table}>
        {grid.map((row) => (
          <tr className={style.tableRow}>
            {row.map((col) => (
              <td className={style.tableData}>{col}</td>
            ))}
          </tr>
        ))}
      </table>
      <button onClick={handleAddRow}>add row</button>
      <button onClick={handleAddCol}>add col</button>
    </>
  );
};

const MainGrid = React.forwardRef(MainGridComp);

export default MainGrid;
