const { Markup } = require("telegraf");
const { CMD_TEXT } = require("./text-buttons");

const listSearch =
    Markup.keyboard([
        [CMD_TEXT.searchMusifyClub]
 
    ]).resize();
    
const backToMenu =
    Markup.keyboard([
        [CMD_TEXT.backToMenu]
    ]).resize();

module.exports = {
    listSearch,
    backToMenu
}