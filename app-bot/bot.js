const { Telegraf, Scenes, session } = require("telegraf");
const { start } = require("./commands/start-com");
const { CMD_TEXT } = require("./managment/text-buttons");
const { musifyClubScene } = require("./scenes/musifyClubScene");
const { musifyClubEnter } = require("./commands/transitions");
const { listSearch } = require("./managment/button-groups");

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage([musifyClubScene])

const setupBot = () => {

    bot.telegram.setMyCommands([
        { command: '/start', description: 'Начало' }
    ])

    bot.use(session({ collectionName: 'sessions' }));
    bot.use(stage.middleware())


    bot.use((ctx, next) => {
        // ctx.deleteMessage()

        return next();
    });


    bot.start(start);
    bot.hears(CMD_TEXT.searchMusifyClub, musifyClubEnter)
    bot.on('text', (ctx) => {
        ctx.session.trackName = ctx.message.text;

        ctx.reply('Выберите, где вы хотите искать этот трек:',
            listSearch);
    });


    // Обработка нажатия на кнопку с названием трека
    bot.action(/.*/, async (ctx) => {
        let trackUrl = ctx.callbackQuery.data;

        if (trackUrl.startsWith('downloadTrack_')) {
            console.log( trackUrl.slice('downloadTrack_'.length))
            console.log( ctx.session.tracks[trackUrl.slice('downloadTrack_'.length)].url);
          ctx.replyWithAudio({ url: ctx.session.tracks[trackUrl.slice('downloadTrack_'.length)].url });
        }
    });

    return bot;
}

module.exports = {
    setupBot
}