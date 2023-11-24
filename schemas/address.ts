import { z } from 'zod';

export default z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string()
});
