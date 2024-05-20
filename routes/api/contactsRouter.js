import express from "express";
import { Contact } from "../../models/contacts.js";
import { contactValidation } from "../../validations/validation.js";
import { httpError } from "../../helpers/httpError.js";

const router = express.Router();

/* GET: // http://localhost:3000/api/contacts */
router.get("/", async (_req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* GET: // http://localhost:3000/api/contacts/:contactId */
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw httpError(404, "Contact ID Not Found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* POST: // http://localhost:3000/api/contacts/ 
{
    "name": "Marvin Pacis",
    "email": "marvinpacis@example.com",
    "phone": "(639) 840-6611"
} 
*/
router.post("/", async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);

    if (error) {
      throw httpError(400, "missing required name field");
    }

    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

/* DELETE: // http://localhost:3000/api/contacts/:contactId */
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw httpError(404);
    }

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

/* PUT: // http://localhost:3000/api/contacts/:contactId 
{
    "name": "Joanna Shaw",
    "email": "joannashaw@example.com",
    "phone": "(639) 777-8819"
} 
*/
router.put("/:contactId", async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw httpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router };
