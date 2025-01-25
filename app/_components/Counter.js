'use client'
import { useState } from "react";

export default function Counter({images}){

    const [counter,setCounter]=useState(0)
    
    return <div>
        
        <p>{images.length}</p>
        
        <button  onClick={()=>setCounter((c)=>c+1)}>{counter}</button>
        </div>
}