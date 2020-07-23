// Utilize the Routes module to separate actions
// Keep like actions together and bring in the main file
const express = require('express');

// Set the Router to communicate actions with the main file
const router = express.Router();

const logger = require('../../middleware/logger.js');
const members = require('../../Members.js');
const uuid = require('uuid');

// Get the full list of members
router.get('/', logger, (req, res) => {
  console.log('The Members...');
  res.json(members); // returns the data in JSON format to the path
});

// Get an individual member from the list based on the id
router.get('/:id', (req, res) => {
  console.log('Getting a Member where ID = ' + req.params.id);
  // Check if a member exists in the list based on their id (not array index)
  const isMember = members.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (isMember) {
    console.log('Member Found');
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    // Return an error status and provide a return message for error handling
    res
      .status(400)
      .json({ msg: 'Member Not Found where ID = ' + req.params.id });
  }
});

// Creating a Member
router.post('/addMember/add', (req, res) => {
  //console.log(req.body);
  const newMember = {
    id: uuid.v4(),
    name: 'Mikey',
    roles: ['Keyboard', 'Backup Vocals'],
    age: 58,
    active: false,
  };

  if (!newMember.name || !newMember.age || !newMember.roles) {
    res
      .status(400)
      .json({ msg: "Please include the member's name, age, and roles" });
  }
  members.push(newMember);
  //console.log(members);
  res.json(members);
});

// Update a Member
router.put('/:id', (req, res) => {
  console.log('Getting a Member where ID = ' + req.params.id);
  // Check if a member exists in the list based on their id (not array index)
  const isMember = members.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (isMember) {
    console.log('Member Found & Updated');
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = member.name ? updatedMember.name : member.name;
        member.roles = member.roles ? updatedMember.roles : member.roles;
        member.age = member.age ? updatedMember.age : member.age;
        member.active = member.active ? updatedMember.active : member.active;

        res.json({ msg: 'Member has been updated', member });
      }
    });
  } else {
    // Return an error status and provide a return message for error handling
    res
      .status(400)
      .json({ msg: 'Member Not Updated where ID = ' + req.params.id });
  }
});

router.delete('/:id', (req, res) => {
  console.log('Getting a Member where ID = ' + req.params.id);
  // Check if a member exists in the list based on their id (not array index)
  const isMember = members.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (isMember) {
    console.log('Member Removed');
    res.json({
      ms: 'Member Deleted',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    // Return an error status and provide a return message for error handling
    res
      .status(400)
      .json({ msg: 'Member Not Found where ID = ' + req.params.id });
  }
});

module.exports = router;
