import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default (role = null) =>{
 return async (req, res, next) => {
    const { authorization } = req.headers;
    try {
      if(!authorization){
        return res.status(401).json({
          message: 'unauthorized access'
        })
      }
      const user = await jwt.verify(authorization, process.env.JWT_SECRET);
      if(!user){
        return res.status(401).json({
          message: 'unauthorized4'
        })
      }
      req.user =user;
      console.log(user);
      if(role){
        if(req.user.role !== role){
          return res.status(401).json({
            message: 'unauthorized access'
          })
        }
        
      }
    } catch (error) {
      return res.status(404).json({ message: 'Review your request' });
    }
    next();
  };

}