import Image from 'next/image';

/**
 * Das Admin trägt die Marke des Kunden, Webtree steht als Werkzeug darunter
 * (Entscheid 06.10.2026). Bewusst nur Favicon und Name: beides passt auf
 * hellen und dunklen Grund, ohne Payloads CSS-Variablen, die 4.0 streicht.
 */

type MarkeProps = { name: string; icon: string };

export function Logo({ name, icon }: MarkeProps) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image src={icon} alt="" width={56} height={56} unoptimized />
      <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}>{name}</span>
        <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Webtree Studio</span>
      </span>
    </span>
  );
}

export function Icon({ icon }: Pick<MarkeProps, 'icon'>) {
  return <Image src={icon} alt="" width={24} height={24} unoptimized />;
}
