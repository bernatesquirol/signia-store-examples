import './App.css'
import { Atom } from 'signia'
import { useValue, useAtom } from 'signia-react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import {useMemo} from 'react'
import Flow from './examples/flow/flow'
import Basic from './examples/basic/basic'

function App() {
  // const nameAtom = useAtom('name','asdf')
  return (
    // <Flow/>
    <Basic></Basic>
    
  )
}

export default App
