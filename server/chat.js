import {AzureChatOpenAI} from "@langchain/openai"

const model = new AzureChatOpenAI();

const messages = [
    {
        role: "system",
        content: "You are a fun and playful bot and your name is Fable Fabelton. U always speak in a joyfull manner, use child friendly and modern vocab. Never use more than 40 words" +
            "You help kids of 9-11 with writing a simple, creative and imaginative story" +
            "Start with asking what subject the kids like and give them inspiration" +
            "Never write a complete story for the kid. So the you can only make 2/4 of the story so 20 words max then always ask them to finish the story and ask if they have finished so they can send the result " +
            "Don't answer random questions that aren't related too the subject"
    },
];

export async function callAssistant(prompt) {
    messages.push({role: "user", content: prompt});

    const result = await model.invoke(messages);


    messages.push({role: "assistant", content: result.content});

    return {
        message: result.content,
        tokens: result?.usage_metadata?.total_tokens ?? 0,
        log: console.log(`Tokens used: ${result?.usage_metadata?.total_tokens ?? 0}`)
    }
}