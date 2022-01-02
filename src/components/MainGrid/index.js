import React, { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

import style from './styles.module.css';

const GridItem = props => {
  const { id, updateGrid, values } = props;
  const len = values.length;

  const [valIdx, setValIdx] = useState(0);

  const handleClick = () => {
    setValIdx(valIdx + 1);
    updateGrid(id, values[(valIdx + 1) % len]);
  };

  const handleReset = event => {
    event.stopPropagation();
    setValIdx(0);
    updateGrid(id, '');
  };

  return (
    <>
      <div className={style.myComp} onClick={handleClick}>
        <span>{values[valIdx % len]}</span>
        {valIdx % len != 0 && (
          <div className={style.reset} onClick={e => handleReset(e)}>
            X
          </div>
        )}
      </div>
    </>
  );
};

const MainGridComp = (props, ref) => {
  const values = ['', 'house', 'gym', 'hospital', 'store'];
  const scoreTemplate = {};
  values.forEach(val => {
    if (val != '' || val != 'house') {
      scoreTemplate[val] = Number.MAX_SAFE_INTEGER - 1;
    }
  });

  const [grid, setGrid] = useState([]);

  const calculateBest = () => {
    const rows = grid.length;
    const cols = grid[0].length;
    const houses = [];
    const houseScores = {};

    const dirs = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];

    // find all houses
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 'house') {
          houses.push([i, j]);
          houseScores[`${[i, j].toString()}`] = scoreTemplate;
        }
      }
    }

    for (let house of houses) {
      const q = [];
      let dist = 0;
      const visited = new Set();
      q.push(house);
      while (q.length > 0) {
        let l = q.length;
        while (l--) {
          const temp = q.shift();
          visited.add(temp.toString());

          //set directions to check
          for (let dir of dirs) {
            const [x, y] = temp;
            const [dx, dy] = dir;
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && !visited.has([newX, newY].toString())) {
              // visited.add(house.toString());
              // console.log({ temp: temp.toString(), new: [newX, newY].toString() });
              q.push([newX, newY]);
            }
          }
          if (grid[temp[0]][temp[1]] === 'gym') {
            // console.log('in gym', dist);
            const scoreObj = houseScores[`${house.toString()}`];
            scoreObj.gym = Math.min(dist, scoreObj.gym);
          } else if (grid[temp[0]][temp[1]] === 'hospital') {
            // console.log('in hospital', dist);
            const scoreObj = houseScores[`${house.toString()}`];
            scoreObj.hospital = Math.min(dist, scoreObj.hospital);
          } else if (grid[temp[0]][temp[1]] === 'store') {
            // console.log('in store', dist);
            const scoreObj = houseScores[`${house.toString()}`];
            scoreObj.store = Math.min(dist, scoreObj.store);
          }
        }
        dist += 1;
      }
    }

    console.log(houseScores);
  };

  const updateGrid = (id, val) => {
    const [row, col] = id.split('-');
    const newGrid = [...grid];
    newGrid[row][col] = val;
    setGrid(newGrid);
  };

  const addRow = () => {
    let len = grid[0]?.length || 1;
    const newRow = [];
    while (len--) newRow.push(_uniqueId());
    const newGrid = [...grid, newRow];
    setGrid(newGrid);
  };

  const addCol = () => {
    const newGrid = [...grid];
    newGrid.forEach(item => {
      item.push(_uniqueId());
    });
    setGrid(newGrid);
  };

  const handleAddRow = () => {
    addRow();
  };

  const handleAddCol = () => {
    addCol();
  };

  return (
    <>
      <button onClick={handleAddRow}>add row</button>
      <button onClick={handleAddCol}>add col</button>
      <button onClick={calculateBest}>Recommend</button>
      <table className={style.table}>
        <tbody>
          {grid.map((row, id) => (
            <tr key={`${id}`} className={style.tableRow}>
              {row.map((col, colId) => (
                <td key={`${id}-${colId}`} data-id={col} className={style.tableData}>
                  <GridItem id={`${id}-${colId}`} updateGrid={updateGrid} values={values} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// const MainGrid = React.forwardRef(MainGridComp);

export default MainGridComp;
