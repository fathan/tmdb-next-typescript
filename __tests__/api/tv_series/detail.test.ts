import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/tv_series/[id]';

jest.mock('axios');

describe('API Route: TV Series Detail', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  const API_URL: string = process.env.API_URL;
  const ACCESS_TOKEN: string = process.env.TMDB_ACCESS_TOKEN;
  const API_KEY: string = process.env.TMDB_API_KEY;

  beforeEach(() => {
    req = {
      method: '',
      query: {},
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should be return tv/[id]', async () => {
    const mockTvSeries = { id: 667538, name: 'TV Series Name 1' };
    const mockResponse = { data: mockTvSeries };
    const mockId = '95057';

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    req.method = 'GET';
    req.query = { id: mockId };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTvSeries);
    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/tv/${mockId}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: 'application/json'
        },
        params: {
          api_key: API_KEY,
          id: mockId
        }
      }
    );
  });

  it('Should be returns error on API request failure', async () => {
    const mockError = new Error('API Error');
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    req.method = 'GET';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
