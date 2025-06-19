export const FALLBACK_COMMON_INSTRUMENTS = [
  "Vocals",
  "Guitar",
  "Bass",
  "Drums",
  "Piano",
  "Keyboard",
  "Saxophone",
  "Trumpet",
  "Violin",
  "Cello",
  "Flute",
  "Clarinet",
  "Trombone",
  "Harmonica",
  "Ukulele",
  "Banjo",
  "Mandolin",
  "Accordion",
  "Synthesizer",
  "DJ Controller",
];
export const FALLBACK_JAM_EVENT_INSTRUMENTS = [
  "Vocals",
  "Guitar",
  "Bass",
  "Drums",
  "Piano",
  "Keyboard",
  "Saxophone",
  "Trumpet",
  "Violin",
  "Cello",
  "Flute",
  "Clarinet",
  "Trombone",
  "Harmonica",
  "Ukulele",
  "Banjo",
  "Mandolin",
  "Accordion",
  "Synthesizer",
  "DJ Controller",
];
export const FALLBACK_INSTRUMENT_FAMILIES = [
  "vocals",
  "strings",
  "winds",
  "percussion",
  "keyboard",
  "electronic",
];
let CURRENT_INSTRUMENTS = null;
let CURRENT_COMMON_INSTRUMENTS = FALLBACK_COMMON_INSTRUMENTS;
let CURRENT_JAM_EVENT_INSTRUMENTS = FALLBACK_JAM_EVENT_INSTRUMENTS;
let CURRENT_INSTRUMENT_FAMILIES = FALLBACK_INSTRUMENT_FAMILIES;
export const instrumentsApi = {
  async fetchInstruments() {
    try {
      const response = await fetch("/api/instruments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.data) {
        CURRENT_INSTRUMENTS = result.data.instruments;
        CURRENT_COMMON_INSTRUMENTS = result.data.commonInstruments;
        CURRENT_JAM_EVENT_INSTRUMENTS = result.data.jamEventInstruments;
        CURRENT_INSTRUMENT_FAMILIES = result.data.instrumentFamilies;
        return result.data;
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      return {
        instruments: null,
        commonInstruments: FALLBACK_COMMON_INSTRUMENTS,
        jamEventInstruments: FALLBACK_JAM_EVENT_INSTRUMENTS,
        instrumentFamilies: FALLBACK_INSTRUMENT_FAMILIES,
      };
    }
  },
  async validateInstrument(instrumentName) {
    try {
      const response = await fetch("/api/instruments/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instrumentName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      return null;
    }
  },
  async searchInstruments(query, family = null) {
    try {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (family) params.append("family", family);
      const response = await fetch(`/api/instruments/search?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      return null;
    }
  },
};
export const getCommonInstruments = () => CURRENT_COMMON_INSTRUMENTS;
export const getJamEventInstruments = () => CURRENT_JAM_EVENT_INSTRUMENTS;
export const getInstrumentFamilies = () => CURRENT_INSTRUMENT_FAMILIES;
export const getAllInstruments = () => CURRENT_INSTRUMENTS;
export const COMMON_INSTRUMENTS = CURRENT_COMMON_INSTRUMENTS;
export const JAM_EVENT_INSTRUMENTS = CURRENT_JAM_EVENT_INSTRUMENTS;
export const INSTRUMENT_FAMILIES = CURRENT_INSTRUMENT_FAMILIES;
export const normalizeInstrumentName = (instrumentName) => {
  if (!instrumentName) return "";
  const exactMatch = CURRENT_COMMON_INSTRUMENTS.find(
    (inst) => inst === instrumentName
  );
  if (exactMatch) return exactMatch;
  const caseInsensitiveMatch = CURRENT_COMMON_INSTRUMENTS.find(
    (inst) => inst.toLowerCase() === instrumentName.toLowerCase()
  );
  return caseInsensitiveMatch || instrumentName;
};
export const getInstrumentFamily = (instrumentName) => {
  if (!instrumentName || !CURRENT_INSTRUMENTS) return "electronic";
  const normalized = normalizeInstrumentName(instrumentName);
  return CURRENT_INSTRUMENTS[normalized]?.family || "electronic";
};
export const isValidInstrument = (instrumentName) => {
  if (!instrumentName) return false;
  return CURRENT_COMMON_INSTRUMENTS.some(
    (inst) => inst.toLowerCase() === instrumentName.toLowerCase()
  );
};
instrumentsApi.fetchInstruments().catch(() => {});