/**
 * BBC MASTER ENTITY DICTIONARY v1
 * (Source of Truth for all terminologies)
 */

export const ENTITY_DICTIONARY = {
    services: [
        "virtual office",
        "sewa kantor",
        "pendirian pt",
        "private office",
        "meeting room"
    ],

    locations: [
        "jakarta selatan",
        "bintaro",
        "tangerang selatan",
        "jaksel"
    ],

    legal: [
        "npwp",
        "nib",
        "domisili usaha",
        "pkp",
        "akta pendirian",
        "alamat bisnis"
    ]
} as const;

export type EntityId = typeof ENTITY_DICTIONARY.services[number] | 
                      typeof ENTITY_DICTIONARY.locations[number] | 
                      typeof ENTITY_DICTIONARY.legal[number];
