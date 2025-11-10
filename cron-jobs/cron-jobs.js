import cron from "node-cron";

cron.schedule("* * * * *", () => {
  fetch(`http://${process.env.ADDRESSE}/api/cron-mail`);
});
