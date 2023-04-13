import { Atom, computed as computedSignia } from 'signia'
import { useAtom, useValue as useValueSignia,  } from 'signia-react'
import { atom, get, getAtoms, computed } from '@natesq/signia-store'
import {useGetAtoms, useValue, useValues} from '@natesq/signia-store-react'
import {ReactNode, Suspense, useEffect, useMemo, useState, use} from 'react'
import { set } from '@natesq/signia-store/lib/es5/store'
import React from 'react'
function WrapPropsPromise({component, children, ...propsRaw}: {component:ReactNode, fallback?:ReactNode,children?:any,}&any){
    let props = useMemo(()=>{
      debugger
      return Object.fromEntries(Object.entries(propsRaw).map(([k,v])=>{
        return [k,isPromise(v)?v:new Promise((res)=>res(v))]
      }))
    },[])
    return React.createElement(component, props, children)
    // return <Dumb {...props}></Dumb>
  }
  const SuspendComponentProps = ({fallback,...props}: any)=>React.createElement(Suspense, {fallback: fallback??React.createElement('div', {}, ['⌛'])}, React.createElement(WrapComponentRaw, props))
  {/* <Suspense fallback={fallback?fallback:<div>⌛</div>}><WrapComponentRaw {...props}></WrapComponentRaw></Suspense> */}
  function WrapComponentSignia({dependencies, component, fallback, children}: {component:ReactNode, dependencies: string[]|Record<string,string>, fallback?:ReactNode,children?:any,}){
    let depsDict = useMemo(()=>Array.isArray(dependencies)?dependencies.reduce((acc,key)=>({...acc, [key]:key}),{}):dependencies,[dependencies])
    let values = useValues(Object.keys(depsDict))
    let valuesRightK = useMemo(()=>{
      return Object.fromEntries(Object.entries(values).map(([k,v])=>{
        return [depsDict[k], v]
      }))
    },[values])
    return React.createElement(WrapComponentRaw, {...valuesRightK, component, fallback}, children)
  }
  const isPromise = (returnVal)=>typeof returnVal?.then === 'function'

  // const MyComponentWithPromises = withPromises(MyComponent)
  function WrapComponentRaw({component, children, ...propsRaw}: {component:ReactNode, fallback?:ReactNode,children?:any,}&any){
    let props = Object.fromEntries(Object.entries(propsRaw).map(([k,v])=>{
      return [k,isPromise(v)?use(v as Promise<any>):v]
    }))
    return React.createElement(component, props, children)
    // return <Dumb {...props}></Dumb>
  }