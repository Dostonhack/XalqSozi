const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf("6377881632:AAFAn5OolnJsuTKcpLqJH_06m0OxGVk8fLA");
const botQabul = new Telegraf("5369599306:AAH2exXdgoXUqIk9SnRVyMPTGSN5EmQAcmQ");
const updateKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback("Telefon raqamni yuborish", "telefon")],
]);
const action = () => {
  bot.start((ctx) => {
    ctx.reply(
      "Assalomu alaykum! Telefon raqamingizni yuboring!!! ",
      updateKeyboard
    );
  });

  bot.action("telefon", (ctx) => {
    ctx.reply("Raxmat fileni yuklang!!!");
  });

  bot.action("admin", (ctx) => {
    const message = ctx.callbackQuery.message;
    ctx.telegram.editMessageText(
      message.chat.id,
      message.message_id,
      null,
      "Keyboard update to the admin",
      updateKeyboard
    );
  });
};
action();
bot.on("message", async (ctx) => {
  const channel = "965748171";
  const chatMember = await ctx.telegram.getChatMember(
    channel,
    ctx.message.from.id
  );
  const isSubscribed = await ["administrator", "member", "owner"].includes(
    chatMember.status
  );
  console.log(isSubscribed, "isSubscribed");
  if (isSubscribed) {
  } else {
    ctx.reply("Kanalga obuna bo'ling " + "@testbotdoston");
  }
  botQabul.editMessageText(ctx.from.id, {
    message: ctx.update.message.text,
  });
  console.log("ccccc", ctx.update.message.text);
});

bot.launch();
