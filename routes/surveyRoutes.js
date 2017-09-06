const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Bailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title: title,
			subject: subject,
			body: body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		
		mailer.send()
			.then((mailerResponse) => {
				survey.save();
				req.user.credits -= 1;
				req.user.save()
					.then((userResponse) => {
						res.send(userResponse);
					})
			})
			.catch((err) => {
				res.status(422).send(err);
			})
	});
};