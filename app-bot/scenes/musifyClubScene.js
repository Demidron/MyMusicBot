const { Scenes, Markup } = require("telegraf");
const { MC_SCENE } = require("../managment/consts-names");
const { backToMenu } = require("../managment/button-groups");
const { CMD_TEXT } = require("../managment/text-buttons");
const { where } = require("../commands/start-com");
const { getTracks } = require("../services/musify-club-service");


// создал сцену типа басе и передал название + можно передать "шаги"
const musifyClubScene = new Scenes.BaseScene(MC_SCENE);

// при входе в сцену отправляется сообщение
// musifyClubScene.enter(ctx => ctx.reply('Ищу в musify сlub!', {

// }));

musifyClubScene.enter(async (ctx) => {

    const trackName = ctx.session.trackName;
    const tracks = await getTracks(trackName);
    ctx.session.tracks=tracks;

    if (tracks ) {
        var trackButtons=[];
        tracks.forEach((el,index) => {
            trackButtons.push([
                {
                    text: el.title,
                    callback_data: "downloadTrack_"+index
                }
            ])
        });
        
        // var trackButtons = tracks.map((track) => {
        //     return  [ { text: track.title, callback_data: track.url }];
        // });
        // // trackButtons.forEach(element => {
        //     let trTest=[ { text: tracks[0].title, callback_data: tracks[0].url }] 
        // // });
        // // const keyboard = Markup.inlineKeyboard([ Markup.button.callback('Старт', 'test_callback')], 
       
        // // );


        
        console.log(trackButtons);
        // console.log(JSON.stringify({
        //     inline_keyboard: trackButtons, // removed [] around option
        //   }))
        ctx.reply('Выберите трек:', {
            reply_markup: {
                inline_keyboard:trackButtons
              }
        });

    } else {
        ctx.reply('Не нашел (');
    }
    // backToMenu;
});




musifyClubScene.hears(CMD_TEXT.backToMenu, ctx => {
    // выходим со сцены
    ctx.scene.leave();
    return where(ctx);
})

module.exports = {
    musifyClubScene
}