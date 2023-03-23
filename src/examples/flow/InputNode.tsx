import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import { useMemo } from 'react'
import { useValue } from 'signia-react'

const InputNode = ({id})=>{
    const nodeAtom = useMemo(()=>{
        return atom(id, 'prova')
    },[id])
    const nodeValue = useValue(nodeAtom)
    return <div style={{width:'100%'}}>
        <input type="text" value={nodeValue} onChange={({target})=>nodeAtom.set(target.value)}/>
    </div>
}
export default InputNode