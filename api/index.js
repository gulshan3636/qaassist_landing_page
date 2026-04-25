export const config = {
  runtime: 'edge',
};

import handler from '../dist/server/server.js';

export default handler.fetch;
