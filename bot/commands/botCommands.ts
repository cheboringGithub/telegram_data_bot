import { Context, Telegraf } from 'telegraf';

export const setBotCommands = (bot: Telegraf<Context>) => {
    bot.command('hello', (ctx) => ctx.reply('world'));
};