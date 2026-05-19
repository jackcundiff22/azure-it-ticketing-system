async function loadTickets()    {
    const ticketsContainer = document.getElementById('ticketsContainer');

    try {
        const response = await fetch('http://localhost:7071/api/GetTickets');
        const tickets = await response.json();

        ticketsContainer.innerHTML = '';

        if (tickets.length === 0) {
            ticketsContainer.innerHTML = '<p>No tickets found.</p>';
            return;
        }

        tickets.forEach(ticket => {
            const ticketCard = document.createElement('div');
            ticketCard.className = 'ticket-card';

            ticketCard.innerHTML = `
                <h3>${ticket.issueType}</h3>
                <p><strong>Name:</strong> ${ticket.name}</p>
                <p><strong>Email:</strong> ${ticket.email}</p>
                <p><strong>Description:</strong> ${ticket.description}</p>
                <p><strong>Status:</strong> ${ticket.status}</p>
                <p><strong>Created:</strong> ${ticket.createdAt}</p>
            `;

            ticketsContainer.appendChild(ticketCard);
        });

    } catch (error) {
        console.error(error);
        ticketsContainer.innerHTML = '<p>Error loading tickets. Please try again later.</p>';
    }
}

loadTickets();
