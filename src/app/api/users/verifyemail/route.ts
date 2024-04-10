import {connect} from  '@/dbConfig/dbConfig'
import User from '@/models/userModel'

import { NextRequest,NextResponse } from 'next/server';


connect();

export async function POST(request:NextRequest) {
   try {
    const {token}=await request.json();

    const user=await User.findOne({ verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});

    if(!user){
      return NextResponse.json({success:false,status:500,messege:"error in verification co"});
    }
    user.isVerfied=true
    user.verifyToken=undefined
    user.verifyTokenExpiry=undefined
    await user.save();

    return NextResponse.json({success:true,messege:"email verifid successfully",status:200});
    
   } catch (error:any) {
     return NextResponse.json({error:error.message,success:false,messege:"error in verification"});
   }
}