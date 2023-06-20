const router = require('express').Router();

router.get('/logout',(req,res) =>{
    res.cookie('jwt','',{maxAge : 1})
    // you cannot delete cookies from server-side directly,
    // instead we created a blank cookie and set its expiry to 1ms.
    // From  client-side, we can remove cookies from Developer tools but that's not a good UX, so implemented a button which will delete cookies for us.
    res.redirect('/');
})

module.exports = router;