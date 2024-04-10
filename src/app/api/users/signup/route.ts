import {connect} from  '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer';
// for each route we need to connect db seperetly {actually function load here}
import { NextRequest,NextResponse } from 'next/server';

connect();


export async function POST(request:NextRequest){
   
  try {
    const { username, email, password }: any =await request.json();

    if(!username || !email || !password){
      return NextResponse.json({error:"all feild required",status:500});
    }

    const user=await User.findOne({email});
    if(user){
      return NextResponse.json({error:'user already exist',status:500});
    }

    const salt=await bcryptjs.genSalt(10);
    const hashedpassword=await bcryptjs.hash(password,salt);

    const res=await User.create({username,email,password:hashedpassword});

   
   // verification email
   await sendEmail({email,emailType:'VERIFY',userId:res._id});
  return NextResponse.json({success:true,status:200,messege:"new user registered successfully",res});

    

    
  } catch (error:any) {
     return NextResponse.json({error:error.message,status:500})
  }
}


