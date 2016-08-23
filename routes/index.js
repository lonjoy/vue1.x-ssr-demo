const express = require('express')
const router = express.Router()

const phantom = require('phantom')


/* GET home page. */

router.get('/render-vue', (req, res, next) => {
    res.render('vue-index')
})

router.get('/vue', (req, res, next) => {
    let sitepage = null
    let phInstance = null
    let response = res
    phantom.create()
        .then(instance => {
            phInstance = instance
            return instance.createPage()
        })
        .then(page => {
            sitepage = page
            return page.open('http://localhost:3000/render-vue')
        })
        .then(status => {
            console.log('status is: ' + status)
            return sitepage.property('content')
        })
        .then(content => {
            // console.log(content)
            response.send(content)
            sitepage.close()
            phInstance.exit()
        })
        .catch(error => {
            console.log(error)
            phInstance.exit()
        })
})

module.exports = router