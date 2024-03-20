import axios from 'axios'
import React, {useEffect, useState } from 'react'
import styles from "../project day1/styles.module.css"
const BarCodeApiFetching = () => { 
    let[state, setState]=useState("")
    let[items,Setitems]=useState([])
    let changeState=(e)=>{ 
        setState(e.target.value)
    }   
    let changeitems=useEffect(()=>{
        if(state){
            axios.get(`https://world.openfoodfacts.org/api/v2/product/${state}.json`).then((res)=>{
            console.log(res.data.product)
            if(res.data&&res.data.product){
                Setitems([res.data.product]) 
            }
            else{
                Setitems([])
                console.log("no items")
            }
        }).catch(()=>{
            console.log("data is not found");
        })
    }
},[state])
  return (
    <div>
        <h1 id={styles.h1}>enter the barcode :</h1>
        <input type="text" name="state" id={styles.input} value={state} onChange={changeState} /><br/><br/>
        <button onClick={changeitems} id={styles.button}>check</button>
        {items.map((d)=>{
            return <div key={d._id}>  
                <h3 className={styles.h3}> name:{d.product_name}</h3>
                <img src={d.image_url} alt='' id={styles.img}/>
                <h3 className={styles.h3}>country of origin:{d.countries_tags}</h3>
                <h3 className={styles.h3}>categories:{d.categories}</h3>
                <h3 className={styles.h3}>creator:{d.creator}</h3>
            </div>
        })}
    </div>
  )
}
export default BarCodeApiFetching