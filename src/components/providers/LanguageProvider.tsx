// Locale is now provided server-side via [locale]/layout.tsx using next-intl.
// This component is kept as a no-op for backward compatibility.
export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
