import './App.css'
import { Atom } from 'signia'
import { useValue, useAtom } from 'signia-react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import {useMemo} from 'react'
import Flow from './examples/flow/flow'
import Basic from './examples/basic/basic'
import Grid from './examples/grid/Grid'

function App() {
  // const nameAtom = useAtom('name','asdf')
  return (
    // <Flow/>
    <>
    <b>BASIC:</b>
    <Basic></Basic>
    <b>GRID:</b>
    <Grid></Grid>
    </>
  )
}

export default App
