const { Faq } = require('../models');
const { BadRequestError } = require('../errors');

const allFaqs = async (req, res) => {
  const faqs = await Faq.findAll({ order: [['order']] });
  res.json({
    succeed: true,
    result: faqs,
  });
};

const createQuesAns = async (req, res) => {
  const { ques, ans, order } = req.body;
  if (!ques || !ans || !order) throw new BadRequestError('Field should not be empty');
  const newQues = await Faq.create({ question: ques, answer: ans, order: order });
  res.status(201).json({
    succeed: true,
    result: newQues,
  });
};

const editQuesAns = async (req, res) => {
  const id = req.params.id;
  const { ques, ans, order } = req.body;
  if (!ques || !ans || !order) throw new BadRequestError('Field should not be empty');
  await Faq.update({ question: ques, answer: ans, order: order }, { where: { id: id } });
  res.json({
    succeed: true,
    msg: 'successfully updated',
  });
};

const deleteQues = async (req, res) => {
  const id = req.params.id;
  await Faq.destroy({ where: { id: id } });
  res.json({
    succeed: true,
    msg: 'successfully deleted',
  });
};

module.exports = { createQuesAns, editQuesAns, deleteQues, allFaqs };
