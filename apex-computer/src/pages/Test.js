import React, { useState } from 'react'

export default function Test() {

     const [input1,setInput1] = useState("");
     const [input2,setInput2] = useState("");

     const handleAjax = async () => {
        const response = await fetch(`https://localhost:8080/apex_comp-backend/TestServlet?val1=${input1}&val2=${input2}`,
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials:"include",
            }
        );

        if(response.ok){
             const responseObj = await response.json();
             console.log(responseObj);
        }else{
            console.error(response);
        }
     }

    return (
        <>
            <div>
                <div>
                    <label>input 1</label>
                    <input type='text' value={input1} onChange={(e) => setInput1(e.target.value)}/>
                </div>
                <div>
                    <label>input 2</label>
                    <input type='text' value={input2} onChange={(e) => setInput2(e.target.value)}/>
                </div>

                <button onClick={handleAjax}>Test</button>
            </div>
        </>
    )
}
