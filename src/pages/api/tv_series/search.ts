import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const API_URL: string = process.env.API_URL;
      const ACCESS_TOKEN: string = process.env.TMDB_ACCESS_TOKEN;
      const API_KEY: string = process.env.TMDB_API_KEY;

      const newParams = Object.assign({
        api_key: API_KEY
      }, req.query !== undefined ? req.query : {});

      const response = await axios.get(
        API_URL + '/search/tv',
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            Accept: 'application/json'
          },
          params: newParams
        }
      );
      
      const data = response.data;

      res.status(200).json(data);
    }
    catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
  else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
}