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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      const headers = Object.fromEntries(Object.entries(req.headers))
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
        method,
        headers: defaultHeader, //{ ...defaultHeader, ...headers } headers contains e.g. content type for request to this proxy,
        body: method === 'GET' || method === 'DELETE' ? undefined : req.body,
      })

      const data = await response.json();
      res.status(response.status).json(data);
    }