import React from 'react';


const resetButton= (props)=>{
    return(
    <>
    <button className='reset--button' onClick={props.onClick}>
        Reset Button
    </button>
    </>
    )
}

export default resetButton;