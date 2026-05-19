const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.CosmosDbConnectionString);

const database = client.database('TicketSystemDB');
const container = database.container('Tickets');

app.http('SubmitTicket', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('IT ticket submission received.');

        if (request.method === 'GET') {
            return {
                status: 200,
                body: 'SubmitTicket API is running.'
            };
        }

        let ticket;

        try {
            ticket = await request.json();
        } catch (error) {
            return {
                status: 400,
                body: 'No ticket data received.'
            };
        }

        const savedTicket = {
            id: crypto.randomUUID(),
            name: ticket.name,
            email: ticket.email,
            issueType: ticket.issueType,
            description: ticket.description,
            status: 'Open',
            createdAt: new Date().toISOString()
        };

        await container.items.create(savedTicket);

        context.log(`Ticket saved to Cosmos DB: ${savedTicket.id}`);

        return {
            status: 200,
            jsonBody: {
                message: 'Ticket submitted and saved successfully!',
                ticketId: savedTicket.id,
                savedTicket: savedTicket
            }
        };
    }
});