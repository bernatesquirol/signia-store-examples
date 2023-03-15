import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Atom } from 'signia'
import { useValue, useAtom } from 'signia-react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import {useMemo} from 'react'
function f(firstName:Atom<string>,lastName:Atom<string>){
  return firstName.value+' '+lastName.value
}
const firstName_ = atom('firstName', 'David')
const lastName_ = atom('lastName', 'Potter')
const fullName_ = computed('fullName',f)


function App() {
  // const nameAtom = useAtom('name','asdf')
  const {firstNameAtom,lastNameAtom, fullNameAtom} = useMemo(()=>{
    return getAtoms(['firstName', 'lastName', 'fullName'])
  },[])
  const firstNameValue = useValue(firstNameAtom)
  const lastNameValue = useValue(lastNameAtom)
  const fullNameValue = useValue(fullNameAtom)
  return (
    <div>
      <input type="text" onChange={({target})=>{
        firstNameAtom.set(target.value)
      }} value={firstNameValue}/><br/>
      <input type="text" onChange={({target})=>{
        lastNameAtom.set(target.value)
      }} value={lastNameValue}/><br/>
      {fullNameValue}
    </div>
    
  )
}

export default App
