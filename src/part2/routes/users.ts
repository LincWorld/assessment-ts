import { Router, Request, Response, NextFunction } from "express";
import getUsers from "../repository/get-users";

const router = Router();

/* GET /users listing. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
	getUsers(); // use this method
	// change your code from here!
	res.send([
		{
			_id: "the-id",
			isActive: true,
			firstName: "Some-one",
			lastName: "Good-name",
			balance: "₹2000"
		}
	]);
});

// B. write another API here....

export default router;
