import { Response } from 'express';

const handleError = (res: Response, error: unknown) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}

export default handleError;