
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
    const id = request.params.id;

    if (!id) {
      return {
        status: 400,
        body: "Falta el parámetro 'id' en la ruta."
      };
    }

    try {
      const container = client.database(databaseId).container(containerId);
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [{ name: '@id', value: id }]
      };
      const { resources: items } = await container.items.query(querySpec).fetchAll();
      const item = items[0] || null;

      if (!item) {
        return {
          status: 404,
          body: `No se encontró el ítem con id: ${id}`
        };
      }

      return {
        status: 200,
        jsonBody: item.value

      };
    } catch (err) {
      context.log.error('Error al consultar Cosmos DB', err);
      return {
        status: 500,
        body: { error: err.message }
      };
    }
  }
});


// app.http('httpData', {
//   methods: ['GET'],
//   authLevel: 'anonymous',
//   handler: async (request, context) => {
//     try {
//       const container = client.database(databaseId).container(containerId);
//       const { resources: items } = await container.items.query({ query: 'SELECT * FROM c' }).fetchAll();
//       return { status: 200, jsonBody: items };
//     } catch (err) {
//       context.log.error('Error querying Cosmos DB', err);
//       return { body: JSON.stringify({ "text": `Hello, ${err.message}! from the API!` }) };

//       //return { status: 500, jsonBody: { error: err.message } };
//     }
//   }
// });
