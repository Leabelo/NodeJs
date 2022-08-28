const router = require("express").Router();
const { Card, validateCard, randomBizNumber } = require("../models/Card");
const auth = require("../middleware/auth");
const { random, rearg } = require("lodash");

router.get("/myCards", auth, async (req, res) => {
 const cards = await Card.find({user_id: req.user._id});
  if (cards.length == 0) return res.status(400).send("There are no cards");
  res.status(200).send(cards);
});


router.delete('/:id', auth, async (req, res) => {
  try{
    const card = await Card.findOneAndRemove({ _id: req.params.id, user_id: req.user._id});
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send('Card not found.');
  }
  });

router.put('/:id', auth, async (req, res) => {
  try{
   const { error } = validateCard(req.body);
     if (error) return res.status(400).send(error.message);
     let updatedCard = await Card.findOneAndUpdate(
       {
          _id: req.params.id,
           user_id: req.user._id 
         },
          req.body,
          { new: true, runValidators: true });
         res.status(200).send(updatedCard);
  }catch(err){
   res.status(400).send('Update failed');
  }
 });


router.get("/:id", auth, async (req, res) => {
  try{
   
    const card = await Card.findOne({
     _id: req.params.id,
      user_id: req.user._id,
     });
    res.status(200).send(card);
  } catch (err) {
    res.status(401).send("Card not Exist");
  }
  });
   
  router.post("/", auth, async (req, res) => {
    const { error } = validateCard(req.body)
    if (error) return res.status(400).send(error.message)
  
  
    const card = new Card({
        ...req.body,
        bizNumber: await randomBizNumber(),
        user_id: req.user._id,
    });
  
    await card.save();
    res.status(200).send(card);
  });


module.exports = router; 