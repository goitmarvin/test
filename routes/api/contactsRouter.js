import express from "express";
import { Contact } from "../../models/contacts.js";
import { contactValidation } from "../../validations/validation.js";
import { httpError } from "../../helpers/httpError.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

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
