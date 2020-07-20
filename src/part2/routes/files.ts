import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/* GET /files/:fileName */
router.get("/:fileName", (req: Request, res: Response, next: NextFunction) => {
	res.send({
		filename: "some-file",
		length: 0,
		content: ""
	});
});

export default router;
