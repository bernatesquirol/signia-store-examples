import { Atom, computed as computedSignia } from 'signia'
import { useAtom, useValue as useValueSignia,  } from 'signia-react'
import { atom, get, getAtoms, computed } from '@natesq/signia-store'
import {useGetAtoms, useValue, useValues} from '@natesq/signia-store-react'
import {ReactNode, Suspense, useEffect, useMemo, useState, use} from 'react'
import { set } from '@natesq/signia-store/lib/es5/store'
import React from 'react'
// import useValue from './useValue'
const a = 'scope friendly'
function fSI($:any){
  let [firstName, lastName] = [$('firstName'),$('lastName')]
  return (new Promise(resolve => setTimeout(resolve, 1000))).then(_=>{
    return firstName+' '+lastName+'. '+a
  })
}
function fNO($:any){
  return (new Promise(resolve => setTimeout(resolve, 1000))).then(_=>{
    return $('firstName')+' '+$('lastName')+'. '+a
  })
}

const firstName_ = atom('firstName', 'David')
const lastName_ = atom('lastName', 'Potter')
const fullName_ = computed('fullName',fSI)

// function fNO($:any){
//   return getPromiseSuchThatResultIsKeyToStore.then(key=>{
//     return $(key)
//   })
// }
// function fNO2($:any){
//   return getPromiseSuchThatResultIsKeyToStore.then(key=>{
//     return $(key)
//   })
// }

// const promise1_ = atom('promise1',new Promise((resolve) => setTimeout(() => resolve('Value 1'),500)))

const Dumb = (props)=>{
  return <div>{JSON.stringify(props)}</div>
}
const OnlyRead = ()=>{
  // using signia-store-react only read
  const {firstName, lastName, fullName} = useValues(['firstName', 'lastName', 'fullName'])
  return <div>
    {[firstName,lastName].join(",")}:
      {use(fullName)}
   </div>
 }



const DisplayPromise = ({promise1})=>{
  let valor = use(promise1)
  return valor
}
const FallBackComponent = <div>⌛</div>
const Cell = ({firstName, promise1})=>{
  return <>
  <div>{firstName}</div>
  <Suspense fallback={FallBackComponent}>
    <DisplayPromise  promise1={promise1}/>
  </Suspense>
  </>
}
function Basic() {
  // the standard signia way, but using signia-store
  const {firstNameAtom,lastNameAtom, fullNameAtom} = useMemo(()=>{
    return getAtoms(['firstName', 'lastName', 'fullName'])
  },[])
  // same as const {firstNameAtom,lastNameAtom, fullNameAtom} = useGetAtoms(['firstName', 'lastName', 'fullName'])
  const firstNameValue = useValueSignia(firstNameAtom)
  const lastNameValue = useValueSignia(lastNameAtom)
  const fullNameValue = useValueSignia(fullNameAtom)
  // const promise1Value = useValueSignia(promise1Atom)
  return (
    <div>
      <input type="text" onChange={({target})=>{
        firstNameAtom.set(target.value)
      }} value={firstNameValue}/><br/>
      <input type="text" onChange={({target})=>{
        lastNameAtom.set(target.value)
      }} value={lastNameValue}/><br/>
      <Cell firstName={firstNameValue} promise1={fullNameValue} />
      <Suspense fallback={FallBackComponent}>
        <OnlyRead/>
      </Suspense>
    </div>
    
  )
}

export default Basic