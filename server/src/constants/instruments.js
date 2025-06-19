export const INSTRUMENTS = {
    Vocals: { family: 'vocals', displayName: 'Vocals' },
    Guitar: { family: 'strings', displayName: 'Guitar' },
    Bass: { family: 'strings', displayName: 'Bass' },
    Violin: { family: 'strings', displayName: 'Violin' },
    Viola: { family: 'strings', displayName: 'Viola' },
    Cello: { family: 'strings', displayName: 'Cello' },
    Banjo: { family: 'strings', displayName: 'Banjo' },
    Mandolin: { family: 'strings', displayName: 'Mandolin' },
    Ukulele: { family: 'strings', displayName: 'Ukulele' },
    Harp: { family: 'strings', displayName: 'Harp' },
    Flute: { family: 'winds', displayName: 'Flute' },
    Clarinet: { family: 'winds', displayName: 'Clarinet' },
    Saxophone: { family: 'winds', displayName: 'Saxophone' },
    Trumpet: { family: 'winds', displayName: 'Trumpet' },
    Trombone: { family: 'winds', displayName: 'Trombone' },
    Tuba: { family: 'winds', displayName: 'Tuba' },
    Oboe: { family: 'winds', displayName: 'Oboe' },
    Bassoon: { family: 'winds', displayName: 'Bassoon' },
    Harmonica: { family: 'winds', displayName: 'Harmonica' },
    Accordion: { family: 'winds', displayName: 'Accordion' },
    Drums: { family: 'percussion', displayName: 'Drums' },
    Congas: { family: 'percussion', displayName: 'Congas' },
    Bongos: { family: 'percussion', displayName: 'Bongos' },
    Timbales: { family: 'percussion', displayName: 'Timbales' },
    Djembe: { family: 'percussion', displayName: 'Djembe' },
    Cajon: { family: 'percussion', displayName: 'Cajon' },
    Xylophone: { family: 'percussion', displayName: 'Xylophone' },
    Marimba: { family: 'percussion', displayName: 'Marimba' },
    Vibraphone: { family: 'percussion', displayName: 'Vibraphone' },
    Tambourine: { family: 'percussion', displayName: 'Tambourine' },
    Triangle: { family: 'percussion', displayName: 'Triangle' },
    Cymbals: { family: 'percussion', displayName: 'Cymbals' },
    Piano: { family: 'keyboard', displayName: 'Piano' },
    Keyboard: { family: 'keyboard', displayName: 'Keyboard' },
    Organ: { family: 'keyboard', displayName: 'Organ' },
    Harpsichord: { family: 'keyboard', displayName: 'Harpsichord' },
    Synthesizer: { family: 'keyboard', displayName: 'Synthesizer' },
    Keytar: { family: 'keyboard', displayName: 'Keytar' },
    'Electronic Drums': { family: 'electronic', displayName: 'Electronic Drums' },
    Sampler: { family: 'electronic', displayName: 'Sampler' },
    Turntables: { family: 'electronic', displayName: 'Turntables' },
    'DJ Controller': { family: 'electronic', displayName: 'DJ Controller' },
};
export const INSTRUMENT_NAMES = Object.keys(INSTRUMENTS);
export const INSTRUMENT_FAMILIES = [
    'vocals',
    'strings',
    'winds',
    'percussion',
    'keyboard',
    'electronic',
];
export const COMMON_INSTRUMENTS = [
    'Vocals',
    'Guitar',
    'Bass',
    'Drums',
    'Piano',
    'Keyboard',
    'Saxophone',
    'Trumpet',
    'Violin',
    'Cello',
    'Flute',
    'Clarinet',
    'Trombone',
    'Harmonica',
    'Ukulele',
    'Banjo',
    'Mandolin',
    'Accordion',
    'Synthesizer',
    'DJ Controller',
];
export const JAM_EVENT_INSTRUMENTS = [
    'Vocals',
    'Guitar',
    'Bass',
    'Drums',
    'Piano',
    'Keyboard',
    'Saxophone',
    'Trumpet',
    'Violin',
    'Cello',
    'Flute',
    'Clarinet',
    'Trombone',
    'Harmonica',
    'Ukulele',
    'Banjo',
    'Mandolin',
    'Accordion',
    'Synthesizer',
    'DJ Controller',
];
export const instrumentToFamilyMap = Object.fromEntries(
    Object.entries(INSTRUMENTS).map(([name, info]) => [name.toLowerCase(), info.family])
);
export const isValidInstrument = (instrumentName) => {
    if (!instrumentName) return false;
    if (INSTRUMENTS[instrumentName]) return true;
    return INSTRUMENT_NAMES.some((name) => name.toLowerCase() === instrumentName.toLowerCase());
};
export const getInstrumentFamily = (instrumentName) => {
    if (!instrumentName) return 'other';
    const exactMatch = INSTRUMENTS[instrumentName];
    if (exactMatch) return exactMatch.family;
    const caseInsensitiveMatch = INSTRUMENT_NAMES.find(
        (name) => name.toLowerCase() === instrumentName.toLowerCase()
    );
    return caseInsensitiveMatch ? INSTRUMENTS[caseInsensitiveMatch].family : 'other';
};
export const normalizeInstrumentName = (instrumentName) => {
    if (!instrumentName) return '';
    if (INSTRUMENTS[instrumentName]) return instrumentName;
    const caseInsensitiveMatch = INSTRUMENT_NAMES.find(
        (name) => name.toLowerCase() === instrumentName.toLowerCase()
    );
    return caseInsensitiveMatch || instrumentName;
};