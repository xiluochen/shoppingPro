const jwt = require('jsonwebtoken');

const loginRouter = require('./loginRouter.js');
const userRouter = require('./userRouter');
const commodityModule = require('./commodityRouter');
const recommendModule = require('./recommendRouter');
const payforRouter = require('./payforRouter');
const swiperRouter = require('./swiperRouter');
const { salt } = require('../config/app.config.js');

module.exports = function (app){
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
    app.use('/good', commodityModule);
    app.use('/recommend', recommendModule);
    app.use('/payfor', payforRouter);
    app.use('/swiper', swiperRouter);

    app.post('/logout', (req, res)=>{
        let token = req.get('token');

        jwt.verify(token, salt, (err, data)=>{
            if(err){
                res.statusCode = 404;
                res.json({
                    code:1008,
                    msg:'logout failed',
                    data:err
                })
                return;
            }
            res.send({
                code: 20000,
                msg:'logout success',
            });
        })
        
    })
}