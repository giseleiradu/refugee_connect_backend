import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
    
    userRole(role){
        if(role === 'admin@'){
          return 'admin';
        } else if(role === 'refugee@'){
          return 'refugee';
        } else if(role === 'donor@'){
          return 'donor';
        } 
      },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
  },

  verifyPassword(dbPassword, password) {
    return bcrypt.compareSync(password, dbPassword);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '5m' }
    );
    return token;
  }
}

export default Helper;
