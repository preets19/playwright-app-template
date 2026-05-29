import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { ApiAssertions, expect, test } from '@your-org/playwright-base-framework';

type PostResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

test.describe('Sample API', () => {
  test('can read a post by id', async ({ apiClient }) => {
    const sampleApi = await startSampleApi();

    try {
      const response = await apiClient.get(`${sampleApi.baseUrl}/posts/1`);

      await ApiAssertions.expectStatus(response, 200);
      await ApiAssertions.expectOk(response);

      const post = await ApiAssertions.json<PostResponse>(response);
      expect(post).toMatchObject({
        userId: 1,
        id: 1
      });
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
    } finally {
      await sampleApi.close();
    }
  });
});

async function startSampleApi(): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/posts/1') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        userId: 1,
        id: 1,
        title: 'sample post',
        body: 'This response comes from a local sample API.'
      }));
      return;
    }

    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
  });

  await listen(server);
  const address = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => close(server)
  };
}

function listen(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
}

function close(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
