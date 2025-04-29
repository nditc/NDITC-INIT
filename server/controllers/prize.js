const db = require('../models');
// cmnt
const Prize = db.prize;
const Participant = db.Participants;
const Event = db.events;

// Create a new prize
exports.createPrize = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.prizeCode || !req.body.prizeEvt || !req.body.prize) {
      return res.status(400).send({
        message: 'All fields are required: email, prizeCode, prizeEvt, prize',
      });
    }

    // Find participant by email
    const participant = await Participant.findOne({
      where: { email: req.body.email },
    });

    if (!participant) {
      return res.status(404).send({
        message: `Participant with email=${req.body.email} not found`,
      });
    }

    // Create prize using the participant's ID
    const prize = {
      parId: participant.id, // Use the found participant's ID
      prizeCode: req.body.prizeCode,
      prizeEvt: req.body.prizeEvt,
      prize: req.body.prize,
    };
    const exists = await Prize.findOne({ where: { prizeCode: req.body.prizeCode } });

    if (exists) {
      res.status(400).send({ succeed: false, msg: 'Duplicate Code!' });
    } else {
      // Save prize in the database
      const data = await Prize.create(prize);
      res.status(201).send({ succeed: true, result: data, msg: 'Added!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      succeed: false,
      message: err.message || 'Some error occurred while creating the Prize.',
    });
  }
};

// Retrieve all prizes
exports.findPrizeAll = async (req, res) => {
  try {
    const data = await Prize.findAll({
      include: [
        {
          model: Participant,
          as: 'parInfo',
          attributes: ['id', 'fullName', 'email', 'institute', 'image'],
        },
      ],
    });
    data.parInfo = data.prizes;
    delete data.prizes;
    res.send({ succeed: true, result: data, msg: 'Added!' });
  } catch (err) {
    res.status(500).send({
      succeed: false,
      message: err.message || 'Some error occurred while retrieving prizes.',
    });
  }
};

// Find a single prize with an id
exports.findPrizeOne = async (req, res) => {
  const code = req.params.code;

  try {
    const data = await Prize.findOne({
      where: { prizeCode: code },
      include: [
        {
          model: Participant,
          as: 'parInfo',
          attributes: ['id', 'fullName', 'email', 'institute', 'image'],
        },
      ],
    });

    if (data) {
      res.send({ succeed: true, result: data, msg: 'Added!' });
    } else {
      res.status(404).send({
        succeed: false,
        message: `Prize with id=${code} not found.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      succeed: false,
      message: `Error retrieving Prize with id=${code}`,
    });
  }
};

// Update a prize by the id
exports.deletePrize = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCount = await Prize.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ succeed: false, message: 'Prize not found' });
    }

    return res.status(200).json({ succeed: true, message: 'Prize deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ succeed: false, message: 'Error deleting prize', error: error.message });
  }
};
