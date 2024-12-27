import { cabinetGrotesk, plusJakartaSans } from '@ats/fonts';
import { TopBar } from '@ats/ui';
import './global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html  data-theme="cmyk" lang="en">
        <body className={`${cabinetGrotesk.variable} ${plusJakartaSans.variable}`}>
            <TopBar />
             <main>{children}</main>
        </body>
      </html>
    );
}
  