const router = require('express').Router();
const User = require("../models/user");

router.get('/signup',(req,res)=>{
    res.render('signup',{status: ""});
})

router.get('/signin',(req,res)=>{
    
    const cookies = req.cookies;
    const role = cookies.role;
    const name = cookies.name;
    switch (role){
        case 'Consumer':
            res.status(201).render("consumer",{name: name,code:req.cookies.code,status:req.cookies.status, item:req.cookies.item, state:req.cookies.state, date:req.cookies.time});
            break;
        case 'Manufacturer':
            res.status(201).render("manufacturer",{name: name,code:req.cookies.code,status:req.cookies.status, item:req.cookies.item, state:req.cookies.state, date:req.cookies.time});
            break;    
        
            default:
                res.render("signup",{status: "login time out"});
      }
})

router.post('/signup', (req,res)=>{
    // console.log(req.body.email + "signup");

    const email = req.body.email;

        // const findEmail =  User.findOne({email: email});
        // console.log(findEmail);
        // if(findEmail){
        //     res.render('signup',{status: "Email already in use!"});
        // }

        // else{}
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        Role: req.body.role
    })

    newUser.save();
    res.status(201).render('signup',{status: "user saved successfully"});


})

router.post('/signin', async(req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({email: email});
    // if(!userData){
    //     res.send('user not found!');
    // }
 
    if(userData.password === password){
         const role = userData.Role;
         const name = userData.name;

         res.cookie('newUser',true);
         res.cookie('name',name);
         res.cookie('role',role);
       
      switch (role){
        case 'Consumer':
            res.status(201).render("consumer",{name: name,code:req.cookies.code,status:req.cookies.status, item:req.cookies.item, state:req.cookies.state, date:req.cookies.time});
            break;
        case 'Manufacturer':
            res.status(201).render("manufacturer",{name: name,code:req.cookies.code,status:req.cookies.status, item:req.cookies.item, state:req.cookies.state, date:req.cookies.time});
            break;    
        
            default:
                res.send('error!');
      }
       
    }else{
        res.render("signup",{status: "Invalid Login Details!"});
    }

   
} catch(error){
    res.render("signup",{status: "Invalid Login Details!!"});
}

})



module.exports = router;

