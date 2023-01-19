import { NextApiRequest} from "next";
import prisma from "../lib/prisma";


export default async (req:NextApiRequest)=>{

    let keyObject = req.body;

    if (req.method === "GET" || req.method==="DELETE") {
      keyObject = { ...req.headers};
    }
    let userId = null; // sets the files field in the request object

    const { session } = keyObject;

    console.log(session);
    if (session && session.trim() !== "") {
      const response = await prisma.session.findUnique({
        where: {
          sessionToken: session,
        },
      });

      userId = response!==null?response["userId"]:null;
    }
    
    req.body = { ...req.body, userId: userId }; // sets the body field in the request object
    // req.files = files;


}