
const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.COSMOS_DB_URI;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

const client = new CosmosClient({ endpoint, key });

app.http('httpData', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      const container = client.database(databaseId).container(containerId);
      const { resources: items } = await container.items.query({ query: 'SELECT * FROM c' }).fetchAll();
      return { status: 200, jsonBody: items };
    } catch (err) {
      context.log.error('Error querying Cosmos DB', err);
      return { status: 500, jsonBody: { error: err.message } };
    }
  }
});


// const { app } = require('@azure/functions');

// app.http('httpData', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         context.log(`Http function processed request for url "${request.url}"`);

//         const name = request.query.get('name') || await request.text() || 'world';
//        return { body: JSON.stringify({ "text": `Hello, ${name}! from the API!` }) };

//     }
// });

