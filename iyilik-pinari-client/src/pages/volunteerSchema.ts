import { z } from 'zod';

export const volunteerSchema = z.object({
    fullName: z.string().min(3, { message: 'Adınız ve soyadınız en az 3 karakter olmalıdır.' }),
    email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin.' }),
    phone: z.string().min(10, { message: 'Lütfen geçerli bir telefon numarası girin.' }),
    motivation: z.string().min(20, { message: 'Lütfen motivasyonunuzu en az 20 karakterle açıklayın.' }),
    availability: z.array(z.string()).nonempty({ message: 'Lütfen en az bir uygun zaman dilimi seçin.' }),
});

export type VolunteerFormInputs = z.infer<typeof volunteerSchema>;