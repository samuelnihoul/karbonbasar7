import { z } from 'zod';

export default z.object({
    address: z.string(),
    city: z.string(),
    zip: z.string().min(1),
    country: z.string(),
    email: z.string().email()
});
