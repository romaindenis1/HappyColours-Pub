import cron from "node-cron";

cron.schedule("* * * * *", () => {
  fetch("http://localhost:3000/api/cron-mail");
});
