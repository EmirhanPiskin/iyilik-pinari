import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, { message: 'Kullanıcı adı zorunludur.' }),
    password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır.' }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;