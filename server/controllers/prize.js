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

    // Save prize in the database
    const data = await Prize.create(prize);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
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
          as: 'prizes',
          attributes: ['id', 'fullName', 'email'],
        },
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
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
          as: 'prizes',
          attributes: ['id', 'fullName', 'email'],
        },
      ],
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Prize with id=${code} not found.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: `Error retrieving Prize with id=${code}`,
    });
  }
};

// Update a prize by the id
exports.updatePrize = async (req, res) => {
  const id = req.params.id;

  try {
    // Check if prize exists
    const prize = await Prize.findByPk(id);
    if (!prize) {
      return res.status(404).send({
        message: `Prize with id=${id} not found.`,
      });
    }

    // If parId is provided, check if participant exists
    if (req.body.parId) {
      const participant = await Participant.findByPk(req.body.parId);
      if (!participant) {
        return res.status(404).send({
          message: `Participant with id=${req.body.parId} not found`,
        });
      }
    }

    // If prizeEvt is provided, check if event exists

    // Update prize
    const num = await Prize.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: 'Prize was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Prize with id=${id}. Maybe Prize was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Prize with id=${id}`,
    });
  }
};
