const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // messages has to be an array of objects that have a role and content and  must start with a system message
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Can you write me a poem about dogs?",
                },
                {
                    role: "assistant",
                    content:
                        "Dogs are the ones we keep by our side, Loyal and loving, they never hide. With wagging tails and wet noses. Their love for us always discloses. From furry pup to old grey friend, Their love for us has no end. With eyes that sparkle and shine, Dogs fill our hearts with love divine. They protect us and make us feel safe, Their presence we could never replace.",
                },
                {
                    role: "user",
                    content:
                        "Can you write the same poem but use the name elsa for the dog?",
                },
            ],
        }),
    });
    const data = await response.json();
    console.log(data);
};
