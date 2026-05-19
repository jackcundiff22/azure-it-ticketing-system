console.log("script.js loaded");

document.getElementById("ticketForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("input, select, textarea");

    const ticket = {
        name: inputs[0].value,
        email: inputs[1].value,
        issueType: inputs[2].value,
        description: inputs[3].value
    };

    console.log("Sending ticket:", ticket);

    try {
        const response = await fetch("http://localhost:7071/api/SubmitTicket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });

        console.log("Response status:", response.status);

        const data = await response.json();

        console.log("Response data:", data);

        alert(data.message + " Ticket ID: " + data.ticketId);

    } catch (error) {
        console.error("Frontend error:", error);
        alert("Error submitting ticket. Check console.");
    }
});