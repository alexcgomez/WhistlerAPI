import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function verifyLoggedUser(req:Request,res:Response):void {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
        if (err) {
          return res.sendStatus(403);
        }
      });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.send(e.message);
  }
}
