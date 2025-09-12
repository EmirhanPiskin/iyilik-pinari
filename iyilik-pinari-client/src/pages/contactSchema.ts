import { z } from 'zod';
// Formumuzun kurallarını burada tanımlıyoruz.
export const contactSchema = z.object({
    // 'name' alanı bir string olmalı ve en az 3 karakter içermeli.
    name: z.string().min(3, { message: 'Adınız en az 3 karakter olmalıdır.' }),

    // 'email' alanı bir string olmalı ve geçerli bir e-posta formatında olmalı.
    email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin.' }),

    // 'message' alanı bir string olmalı ve en az 10 karakter içermeli.
    message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır.' }),
});

// Zod'un şemadan otomatik olarak tip çıkarmasını sağlıyoruz. Bu bize tip güvenliği sağlar.
export type ContactFormInputs = z.infer<typeof contactSchema>;