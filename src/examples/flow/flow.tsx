import { useValue, useAtom } from 'signia-react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'

import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css';
import FunctionNode from './FunctionNode'
import InputNode from './InputNode'


const nodesAtom = atom('nodes',[
  {
    id: '1',
    position: { x: 50, y: 50},
    // data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 150, y: 150 },
    type: 'function',
    // data: { label: 'World' },
  },
])
const edgesAtom = atom('edges', [{ id: '1-2', source: '1', target: '2' }])
const nodeTypes = {
    function: FunctionNode,
    input: InputNode
};

function Basic() {
  // const nameAtom = useAtom('name','asdf')
  const nodes = useValue(nodesAtom)
  const edges = useValue(edgesAtom)
  return (
    <div style={{ height: window.innerHeight, width: window.innerWidth }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
    
  )
}

export default Basic