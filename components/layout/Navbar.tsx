import { NavbarClient } from './NavbarClient';

export function Navbar({ locale }: { locale: string }) {
  return <NavbarClient locale={locale} />;
}
