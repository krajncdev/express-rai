var QuestionModel = require('../models/questionModel.js');

/**
 * questionController.js
 *
 * @description :: Server-side logic for managing questions.
 */
module.exports = {
  /**
   * questionController.list()
   */
  list: function (req, res) {
    QuestionModel.find(function (err, questions) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting question.',
          error: err,
        });
      }

      var data = [];
      data.questions = questions;

      return res.render('question/list', data);
    });
  },

  /**
   * questionController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    QuestionModel.findOne({ _id: id }, async function (err, question) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting question.',
          error: err,
        });
      }

      if (!question) {
        return res.status(404).json({
          message: 'No such question',
        });
      }

      var answers;
      try {
        answers = await AnswerModel.find({ questionId: id });
      } catch (err) {
        console.error(err);
      }

      var data = [];
      data.question = question;
      data.answers = answers ? answers : [];

      return res.render('question/show', data);
    });
  },

  /**
   * questionController.create()
   */
  create: function (req, res) {
    var question = new QuestionModel({
      title: req.body.title,
      postedBy: req.session.userId,
      description: req.body.description,
      createdAt: req.body.createdAt ? req.body.createdAt : Date.now(),
    });

    question.save(function (err, question) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating question',
          error: err,
        });
      }

      return res.status(201).json(question);
    });
  },

  /**
   * questionController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    QuestionModel.findOne({ _id: id }, function (err, question) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting question',
          error: err,
        });
      }

      if (!question) {
        return res.status(404).json({
          message: 'No such question',
        });
      }

      question.title = req.body.title ? req.body.title : question.title;
      question.description = req.body.description
        ? req.body.description
        : question.description;

      question.save(function (err, question) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating question.',
            error: err,
          });
        }

        return res.json(question);
      });
    });
  },

  /**
   * questionController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    QuestionModel.findByIdAndRemove(id, function (err, question) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the question.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },

  publish: function (req, res) {
    return res.render('question/publish');
  },
};
