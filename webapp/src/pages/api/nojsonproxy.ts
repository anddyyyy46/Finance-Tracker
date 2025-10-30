import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {   
    const token = req.cookies.accessToken;
    const url = new URL(req.url!, `http://${req.headers.host}`)
    const path = url.searchParams.get('path') || ''
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      const method = req.method;
      const defaultHeader = {
        'Authorization': `Bearer ${token}`
      }
      const headers = Object.fromEntries(Object.entries(req.headers))
      const backendUrl = process.env.NEXT_PUBLIC_SYSTEM ==="DEV" ? process.env.NEXT_PUBLIC_BACKEND_URL : process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
      const response = await fetch(`${backendUrl}${path}`, {
        method,
        headers: { ...defaultHeader, ...headers },
        body: method === 'GET' || method === 'DELETE' ? undefined : req.body,
      })
      if(!response.ok){
        const err =  await response.text()
        res.status(response.status).json({"Error": err})
      }else {
      const data = await response.json()

      res.status(response.status).json(data);
      }
    }