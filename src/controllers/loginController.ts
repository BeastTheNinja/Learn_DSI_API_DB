import { Request, Response } from "express";
import { loginUser } from "../services/loginUser";

export const login = async (req:Request, res: Response) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required'})
        }

        const result = await loginUser(email, password)
        
        return res.status(200).json({
            message: 'Login successful',
            user: result.user,
            token: result.token
        })
    } catch(error: any ) {
        console.error(error);
        return res.status(401).json({
            message: error.message || 'Login failed'
        })
        
    }
    
}