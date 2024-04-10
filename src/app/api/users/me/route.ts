import {connect} from  '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer';
// for each route we need to connect db seperetly {actually function load here}
import { NextRequest,NextResponse } from 'next/server';
import { getdatatoken } from '@/helper/getdatatoekn';


connect();

export async function GET(request:NextRequest) {
  try {
     const userId=await getdatatoken(request)||"";
     
     const user=await User.findById({_id:userId});

     if(!user){
      return NextResponse.json({success:false,messege:"user not exist"})
     }

     return NextResponse.json({user,messege:"user found"});

    
  } catch (error:any) {
    return NextResponse.json({sucess:false,message:"error in getting user detail",error:error.message})
  }
}