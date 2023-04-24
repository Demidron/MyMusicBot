const { mainMenu, listSearch } = require("../managment/button-groups");

//тут ответы на соответ. команды
const start = ctx =>ctx.reply('Что ищешь?');

const where = ctx =>ctx.reply('Где искать?',{
    disable_web_page_preview: true,
    ...listSearch
});

module.exports = {
    start,
    where
}