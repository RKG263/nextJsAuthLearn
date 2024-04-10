import mongoose from "mongoose";

export  async function connect() {
  try {

   await mongoose.connect(process.env.MONGO_URL!);
    const connection =mongoose.connection;

    connection.on('connected',()=>{
      console.log('mongodb connected')
    })

    connection.on('error',(err)=>{
      console.log('mongoose find error in connection: '+err)
      process.exit()
    })
    
  } catch (error) {
    console.log('something went wrong' + error);
  }
}