import {Telegraf} from "telegraf";
import 'dotenv/config'
import {app, HttpRequest, HttpResponseInit} from "@azure/functions";


const token = process.env["BOT_TOKEN"];
if(!token) throw new Error('Bot token is not provided');

let bot: Telegraf;
bot = new Telegraf(token, {
    telegram: { webhookReply: true }
} );
bot.telegram.setWebhook('https://telegramdatabot.azurewebsites.net');
bot.command('hello', (ctx) => ctx.reply('world'));



export async function httpTrigger1(request: HttpRequest): Promise<HttpResponseInit> {
    const rawBody = await request.json();
    if (typeof rawBody === "string") {
        await bot.handleUpdate(JSON.parse(rawBody));
    }
    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
}

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});

