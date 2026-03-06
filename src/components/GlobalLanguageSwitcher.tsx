import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function GlobalLanguageSwitcher() {
  return (
    <div className="fixed top-4 left-4 z-50">
      <LanguageSwitcher />
    </div>
  );
}
