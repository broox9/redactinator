const ExpressRouter = require('express').Router
const router = ExpressRouter()

let mockDB = require('./db/db')


router.get('/get_consults', (req, res) => {
  res.status(200).send(mockDB.getConsults())
})

router.put('/update_image', (req, res) => {
  const { img_id, redaction_status, censors = null } = req.body;
  console.log(req.body)

  const newImg = mockDB.saveImage(img_id, redaction_status, censors)

  if (newImg) {
    res.status(202).json(req.body)
  } else {
    res.status(200).json({ error: 'Image Not Found' })
  }

})


router.get('/reset_data', (req, res) => {
  mockDB.reset()
  res.redirect('/api/get_consults')
})


module.exports = router
