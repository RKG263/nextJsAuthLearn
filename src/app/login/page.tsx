"use client";
import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function signUp() {
  const [user, setuser] = useState({
    
    email: "",
    password: "",
  });

  const [process,setprocess]=useState(false);

  const [btnenable,setbtnenable]=useState(false);

   useEffect(()=>{
      if( user.email.length>0 && user.password.length>0){
        setbtnenable(true);
        console.log("hellp")
      }else{
        setbtnenable(false);
      }
  },[user])
  
  const router=useRouter();


  const onSubmit=async()=>{
    try {
      setprocess(true);
      const res=await axios.post('http://localhost:3000/api/users/login',user);
      router.push('/profile')
        console.log(res)
      
    } catch (error:any) {
      router.push('/')
      console.log(error.message)
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        {process===true?<h4 className="text-sky-400">processing</h4>:<h4 className="text-red-400">HoldOn</h4>}
       
        <label htmlFor="">email</label>
        <input className="rounded-full text-black p-2" type="text" 
          value={user.email}
          onChange={(e)=>{
            setuser({...user, email:e.target.value})
          }}

        />
        <label htmlFor="">password</label>
        <input className="rounded-full text-black p-2" type="password" 
          value={user.password}
          onChange={(e)=>{
            setuser({...user, password:e.target.value})
          }}

        />

        {btnenable===true?<button className="rounded-full m-3 p-1 bg-sky-500/100" 
         onClick={onSubmit}>Login</button>:<button className="rounded-full m-3 p-1 bg-red-500/100" 
         >Login</button>}
      </div>
    </>
  );
}

export default signUp;
