import { atom, get, getAtoms, computed } from '@natesq/signia-store'
import { useValues } from '@natesq/signia-store-react'
const globalState = atom('k1', 1, 'globalStore')
const globalState2 = atom('k2', 'A', 'globalStore')
const columnsOverride = [atom('k1', 2, 'colState-0'),atom('k1', 3, 'colState-1'),atom('k1', 4, 'colState-2')]
const rowsOverride = [atom('k2', 'B', 'rowState-0'),atom('k2', 'C', 'rowState-1'),atom('k2', 'D', 'rowState-2')]
const Cell = ({row, col})=>{
    const {k1,k2} = useValues(['k1', 'k2'],['globalStore', 'colState-'+col, 'rowState-'+row]) as any
    return <span>{`${k1}-${k2};`}</span>
}
const Grid = ()=>{
    return <div style={{display:'flex',flexDirection:'column'}}>{columnsOverride.map((a, i)=>{
        return <div style={{display:'flex',flexDirection:'row'}}>
            {rowsOverride.map((a, j)=>{
            return <Cell row={j} col={i}></Cell>
            })}
        </div>
    }).flat()}</div>
}

export default Grid