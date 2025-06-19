import express from "express";
import {
  INSTRUMENTS,
  INSTRUMENT_NAMES,
  INSTRUMENT_FAMILIES,
  COMMON_INSTRUMENTS,
  JAM_EVENT_INSTRUMENTS,
  isValidInstrument,
  getInstrumentFamily,
  normalizeInstrumentName,
} from "../constants/instruments.js";
const router = express.Router();
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        instruments: INSTRUMENTS,
        instrumentNames: INSTRUMENT_NAMES,
        instrumentFamilies: INSTRUMENT_FAMILIES,
        commonInstruments: COMMON_INSTRUMENTS,
        jamEventInstruments: JAM_EVENT_INSTRUMENTS,
      },
    });
  } catch (error) {
    console.error("Error fetching instruments:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch instruments",
    });
  }
});
router.post("/validate", (req, res) => {
  try {
    const { instrumentName } = req.body;
    if (!instrumentName) {
      return res.status(400).json({
        success: false,
        error: "Instrument name is required",
      });
    }
    const isValid = isValidInstrument(instrumentName);
    const family = getInstrumentFamily(instrumentName);
    const normalized = normalizeInstrumentName(instrumentName);
    res.json({
      success: true,
      data: {
        isValid,
        family,
        normalized,
        originalName: instrumentName,
      },
    });
  } catch (error) {
    console.error("Error validating instrument:", error);
    res.status(500).json({
      success: false,
      error: "Failed to validate instrument",
    });
  }
});
router.get("/search", (req, res) => {
  try {
    const { q: query, family } = req.query;
    let filteredInstruments = INSTRUMENT_NAMES;
    if (family && INSTRUMENT_FAMILIES.includes(family)) {
      filteredInstruments = filteredInstruments.filter(
        (name) => INSTRUMENTS[name].family === family
      );
    }
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredInstruments = filteredInstruments.filter((name) =>
        name.toLowerCase().includes(lowerQuery)
      );
    }
    res.json({
      success: true,
      data: {
        instruments: filteredInstruments.map((name) => ({
          name,
          displayName: INSTRUMENTS[name].displayName,
          family: INSTRUMENTS[name].family,
        })),
        totalCount: filteredInstruments.length,
      },
    });
  } catch (error) {
    console.error("Error searching instruments:", error);
    res.status(500).json({
      success: false,
      error: "Failed to search instruments",
    });
  }
});
export default router;