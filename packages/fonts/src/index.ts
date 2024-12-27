import localFont from 'next/font/local';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const cabinetGrotesk = localFont({
  src: './fonts/CabinetGrotesk_Complete/Variable/CabinetGrotesk-Variable.ttf',
  variable: '--font-cabinet',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});