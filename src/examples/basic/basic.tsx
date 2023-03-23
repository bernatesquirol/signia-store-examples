import { Atom } from 'signia'
import { useAtom, useValue as useValueSignia } from 'signia-react'
import { atom, computed, get, getAtoms } from '@natesq/signia-store'
import {useGetAtoms, useValue, useValues} from '@natesq/signia-store-react'
import {useMemo} from 'react'
// import useValue from './useValue'

function f(firstName:Atom<string>,lastName:Atom<string>){
  return firstName.value+' '+lastName.value
}
const firstName_ = atom('firstName', 'David')
const lastName_ = atom('lastName', 'Potter')
const fullName_ = computed('fullName',f)
// computed('vfinal',f, ['store2'], 'store22')
// computed('vfinal',f, ['store1'], 'store11')
// computed('vfinal',f, [], 'store21', {'color':'store2', 'vehicle':'store1'})
// computed('vfinal',f, [], 'store12',{'color':'store2', 'vehicle':'store1'})
// // queden guardades
// window.store.firstName
// window.store.lastName
// window.store.fullName

const OnlyRead = ()=>{
  // using signia-store-react only read
  const {firstName, lastName, fullName} = useValues(['firstName', 'lastName', 'fullName'])
  return <div>
    {[firstName,lastName,fullName].join(",")}
  </div>
}
const OnlyReadAtoms = ()=>{
// using signia-store-react
const {firstNameAtom,lastNameAtom, fullNameAtom} = useGetAtoms(['firstName', 'lastName', 'fullName'])
const firstNameValue = useValue('firstName')
const lastNameValue = useValue('lastName')
const fullNameValue = useValue('fullName')
return (
  <div>
    <input type="text" onChange={({target})=>{
      firstNameAtom.set(target.value)
    }} value={firstNameValue}/><br/>
    <input type="text" onChange={({target})=>{
      lastNameAtom.set(target.value)
    }} value={lastNameValue}/><br/>
    {fullNameValue}
  </div>)
}

function Basic() {
  // the standard signia way, but using signia-store
  const {firstNameAtom,lastNameAtom, fullNameAtom} = useMemo(()=>{
    return getAtoms(['firstName', 'lastName', 'fullName'])
  },[])
  const firstNameValue = useValueSignia(firstNameAtom)
  const lastNameValue = useValueSignia(lastNameAtom)
  const fullNameValue = useValueSignia(fullNameAtom)
  return (
    <div>
      <input type="text" onChange={({target})=>{
        firstNameAtom.set(target.value)
      }} value={firstNameValue}/><br/>
      <input type="text" onChange={({target})=>{
        lastNameAtom.set(target.value)
      }} value={lastNameValue}/><br/>
      {fullNameValue}
      <OnlyReadAtoms/>
      <OnlyRead/>
    </div>
    
  )
}

export default Basic