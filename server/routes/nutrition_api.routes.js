const express = require('express')
const axios = require('axios')
const { response } = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.post("/search_food", async (req,res) => {
  const food = req.body.name
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&dataType=Branded&pageSize=25&pageNumber=2&sortBy=dataType.keyword&sortOrder=asc&brandOwner=Kar%20Nut%20Products%20Company&api_key=0s2B2FJTydpyL7LR8T2t5VVVjOgD8W7SlexmQWfl`
  try{
    axios.get(url)
    .then(function(response){
      console.log(response.data)
      res.send(response.data)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

module.exports = router