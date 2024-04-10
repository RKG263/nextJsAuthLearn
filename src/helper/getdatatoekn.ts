import {connect} from  '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer';
import jwt from  'jsonwebtoken'
// for each route we need to connect db seperetly {actually function load here}
import { NextRequest,NextResponse } from 'next/server';


connect();

export async function getdatatoken(request:NextRequest) {
    try {
       const token:any=await request.cookies.get("token")?.value||"";

       if(!token){
          return NextResponse.json({error:"error in findind token"})
       }

       const user:any=await jwt.verify(token,process.env.TOKEN_SECRET!);

       return user.id
      
    } catch (error:any) {
      console.log(error.message);
    }
}