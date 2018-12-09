import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/db';
import Helper from '../helper/helper';

dotenv.config()

class User {


  static async getAll(req, res) {
      // const {id} = req.params;
      // if(id !=req.user.id){
      //   return res.status(401).json({
      //     message: "Unauthorized access"
      //   });
      // }
  
      const { rows } = await db.query("SELECT * FROM users");
      if (rows.length) {
        return res.status(200).json({
          status: "Successful",
          users: rows
        });
      } else {
        return res.json({
          message: "No users found"
        });
      }
    }

  // static async getUserParcels(req, res) {
  //   const {id} = req.params;
  //   if(id !=req.user.id){
  //     return res.status(401).json({
  //       message: "Unauthorized access"
  //     });
  //   }

  //   const { rows } = await db.query("SELECT * FROM parcels WHERE userid = $1", [id]);
  //   if (rows.length) {
  //     return res.status(200).json({
  //       status: "Successful",
  //       parcels: rows
  //     });
  //   } else {
  //     return res.json({
  //       message: "No orders founds"
  //     });
  //   }
  // }


  // static async getUserParcel(req, res) {
  //   const {id} = req.params;
  //   if(id !=req.user.id){
  //     return res.status(401).json({
  //       message: "Unauthorized access"
  //     });
  //   }

  //   const { rows } = await db.query("SELECT * FROM parcels WHERE userid = $2 AND id = $1", [id], req.user.id);
  //   if (rows.length) {
  //     return res.status(200).json({
  //       status: "Successful",
  //       parcels: rows
  //     });
  //   } else {
  //     return res.json({
  //       message: "No orders founds"
  //     });
  //   }
  // }



  static async signUp(req, res) {
    if (req.body.names && req.body.uname && req.body.password && req.body.phone) {
      const qry = `INSERT INTO
      users(names, uname, role, password, email, phone, location)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

      const user = [
        req.body.names,
        req.body.uname,
        Helper.userRole(req.body.role),
        Helper.hashPassword(req.body.password),
        req.body.email,
        req.body.phone,
        req.body.location
      ];

      try {
        const { rows } = await db.query(qry, user);

        if (rows.length > 0) {
          const user = rows[0];
          const token = jwt.sign({
            id:user.id,
            role: user.role
          }, process.env.JWT_SECRET );
          return res.status(201).json({
            user,
            token
          });
        }
      } catch (e) {
        console.log(e);
        return res
          .status(500)
          .json({ message: "Server under maintainance!" });
         
        }  
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }

  static async signIn(req, res) {
    if (req.body.uname && req.body.password) {
      const qry = "SELECT * FROM users WHERE uname = $1";
      const login = [req.body.uname];
      
      try {
        const { rows } = await db.query(qry, login);
        if (rows.length > 0) {
          if (Helper.verifyPassword(rows[0].password, req.body.password)) {
            const user = {
              id: rows[0].id,
              names: rows[0].names,
              uname: rows[0].uname,
              role: rows[0].role,
              phone: rows[0].phone,
              email: rows[0].email,
              location: rows[0].location
            }
            const token = jwt.sign({
              id:user.id,
              role: user.role
            }, process.env.JWT_SECRET );
            return res.status(202).json({
              user,
              token
            });
          } else {
            return res
              .status(401)
              .json({ message: "Username or Password is incorrect!" });
          }
        } else {
          return res.status(404).json({ message: "Bad request" });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please enter the required information" });
    }
  }
}
export default User;
