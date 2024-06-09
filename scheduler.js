const schedule = require("node-schedule");

const targetTime = new Date("2024-06-09T12:00:00");

schedule.scheduleJob(targetTime, () => {
  console.log("The scheduled time has arrived!");
});
