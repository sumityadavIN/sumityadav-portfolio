// sanity/lib/api.ts

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET |

| 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID |

| 'peswtk04'

// This tells the computer to use the current date for the API version
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION |

| '2024-03-18'

// This helps load images faster
export const useCdn = false