// schedule/scheduler.js
const cron = require('node-cron');
const Reminder = require('../models/reminder');
const User = require('../models/users');
const sendEmail = require('../util/email');
const Sequelize = require('sequelize');

cron.schedule('* * * * *', async () => { // Runs every minute
    try {
        const reminders = await Reminder.findAll({
            where: {
                date: {
                    [Sequelize.Op.lte]: new Date()
                }
            }
        });

        for (const reminder of reminders) {
            const user = await User.findByPk(reminder.userId);
            await sendEmail(user.email, 'Reminder', reminder.message);

            // Optionally delete the reminder or mark it as sent
            await reminder.destroy();
        }

        console.log('Reminders processed');
    } catch (err) {
        console.error('Failed to process reminders:', err);
    }
});
