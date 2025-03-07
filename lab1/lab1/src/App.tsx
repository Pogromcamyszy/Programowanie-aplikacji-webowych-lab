import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Iproject{
  id: number;
  name: string;
  description: string;
}

class project implements Iproject{

  id: number;
  name: string;
  description: string;

  constructor(id:number, name:string , description:string){
    this.id = id;
    this.name = name;
    this.description = description
  }
}

function App() { 
   
  return (
    <>
      
    </>
  )
}


export default App
