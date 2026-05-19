const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.CosmosDbConnectionString);
const database = client.database('TicketSystemDB');
const container = database.container('Tickets');

app.http('GetTickets', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Getting all tickets from Cosmos DB.');

        const querySpec = {
            query: 'SELECT * FROM c ORDER BY c.createdAt DESC'
        };

        const { resources: tickets } = await container.items
            .query(querySpec)
            .fetchAll();

        return {
            status: 200,
            jsonBody: tickets 
        };
    }
});