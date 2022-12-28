// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken } from '../../librarys/axios-util/axios-util.library';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('...getAccessToken', getCookie('access_token', { req, res }));
  res.status(200).json({ name: 'John Doe' });
}
