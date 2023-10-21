import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt  from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
    
        await newUser.save()
        res.status(201).json('User created SuCCessfully !')
    } catch (error) {
        next(error)
        // res.status(500).json(error.message)
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser)  return next(errorHandler(404, 'User Not Found !'))
        
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword)  return next(errorHandler(401, 'Invalid Password !'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        
        const { password: pass, ...validUserInfos} = validUser._doc
        
        res
        .cookie('access_token', token, 
            { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}
        )
        .status(200)
        .json(validUserInfos)
        // res.status(201).json('User created SuCCessfully !')
    } catch (error) {
        next(error)
        // res.status(500).json(error.message)
    }

}

export const google = async (req, res, next) => {
    try {
        const user =  await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET )
            const { password: pass, ...rest } = user._doc;
            res
              .cookie('access_token', token,
                { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}
                )
              .status(200)
              .json(rest)
        } else {
            // start to generate a new password, double 8 or 16car string
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(password, 10)
            const username0 = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) 
            const newUser = new User
            (
                { 
                    username: username0, 
                    email: req.body.email, 
                    password: hashedPassword,
                    avatar: req.body.photo 
                }
            )
            await newUser.save() 
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET )
            const { password: pass, ...rest } = user._doc;
            res
              .cookie('access_token', token,
                { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}
                ).status(200).json(rest)

            // res.status(201).json('Google User created SuCCessfully !')
        }
    } catch (error) {
        next(error)
    }
}