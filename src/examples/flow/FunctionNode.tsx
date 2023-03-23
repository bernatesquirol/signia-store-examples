import Editor from '@monaco-editor/react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import { useMemo } from 'react'
import { useValue } from 'signia-react'

const FunctionNode = ({id, })=>{
    const formulaAtom = useMemo(()=>{
        return atom(id, '(text)=>`hey ${text}`')
    },[id])
    const outputAtom = useMemo(()=>{
        return computed(`output-${id}`, ()=>{
            // NEED dependencies!
        })
    },[id])
    const nodeValue = useValue(formulaAtom)
    const outputValue = useValue(outputAtom)
    return <div style={{width:'100%'}}>
        {outputValue}
        <div style={{'wordWrap': 'break-word', 'width':'30vh'}}>
            <details>
                <summary> click me </summary>
                <div style={{'wordWrap': 'break-word', width:'60vh'}}>
                    <Editor
                        height="20vh"
                        width="60vh"
                        options={{minimap:{enabled:false}}}
                        defaultLanguage="javascript"
                        defaultValue={nodeValue}
                        onChange={(v,e)=>{
                            formulaAtom.set(v)}}
                    />
                    {/* <textarea rows="30" cols="100" value={dataSnapshot.formula} onChange={(e)=>{
                        dataState.formula = e.target.value
                    }}/> */}          
                </div>
            </details>
            
        </div>
    </div>
}
export default FunctionNode