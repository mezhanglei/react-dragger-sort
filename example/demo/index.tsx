import React, { useState } from 'react';
import "./index.less";
import DndSortable, { DndProps } from "../../src/index";

const Home: React.FC<any> = (props) => {
  const [part1, setPart1] = useState([1, 2, 3, 4, 5])
  const [part2, setPart2] = useState([6, 7, 8, 9, 10])

  const onUpdate: DndProps['onUpdate'] = (params) => {
    const { from, to } = params;
    const formIndex = from?.index
    const toIndex = to?.index
    console.log(params, 'the same group');
    // do something ...
  }

  const onAdd: DndProps['onAdd'] = (params) => {
    const { from, to } = params;
    const fromGroup = from?.group
    const toGroup = to?.group
    console.log(params, fromGroup, toGroup, 'different group');
    // do something ...
  }

  return (
    <div>
      <p>part1</p>
      <DndSortable
        onUpdate={onUpdate}
        onAdd={onAdd}
        collection={{ group: 'part1' }} // custome props
        style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px', marginTop: '10px' }}
        options={{
          hiddenFrom: true
        }}>
        {
          part1?.map((item, index) => (<div style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={index}>{item}</div>))
        }
      </DndSortable>
      <p>part2</p>
      <DndSortable
        onUpdate={onUpdate}
        onAdd={onAdd}
        collection={{ group: 'part2' }}  // custome props
        style={{ display: 'flex', flexWrap: 'wrap', background: 'gray', width: '200px', marginTop: '10px' }}
        options={{
          hiddenFrom: true
        }}>
        {
          part2?.map((item, index) => (<div style={{ width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={index}>{item}</div>))
        }
      </DndSortable>
    </div>
  );
};

export default Home;
