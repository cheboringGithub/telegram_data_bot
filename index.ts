import {Telegraf} from "telegraf";
import {data} from "./data";

const token: string = '6349262148:AAGxPylFl1Rh_sYIayTOi_591sGyd7lgFso';


(async function launcher(): Promise<void> {
    const bot: Telegraf = new Telegraf(token);
    await bot.telegram.setMyCommands([{command: 'data', description: 'Get Your Personal Data'}]);

    bot.command("data", (ctx) => {

        ctx.reply("Select your personal data", {
            reply_markup: {
                inline_keyboard: [
                    /* Inline buttons. 2 side-by-side */
                    [ { text: "Phone number", callback_data: "phone" } ],

                    /* One button */
                    [ { text: "PESEL", callback_data: 'pesel' } ],

                    /* Also, we can have URL buttons. */
                    [ { text: "NIP", callback_data: "nip" } ]
                ]
            }
        });
    });

    bot.action('pesel', (ctx) => {
        ctx.sendMessage( data.Pesel);
    })

    bot.action('phone', (ctx) => {
       ctx.sendMessage(data.phoneNumber);
    });

    bot.action('nip', (ctx) => {
        ctx.sendMessage(data.NIP);
    });


    await bot.launch();
})();

