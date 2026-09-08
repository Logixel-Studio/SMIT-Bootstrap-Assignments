import { LOGOS, type LogoId } from '../data/logos';

interface AppIconProps {
  id: LogoId;
  size?: number;
  radius?: number;
}

const TILE_BG: Record<string, (color: string) => string> = {
  brand: (color) => color,
  light: () => '#f5f6f8',
  dark: () => '#111214',
};

/**
 * Renders a real, recognizable third-party brand mark inside a tile.
 * The tile carries the app's own brand color — never LOGIXEL blue —
 * so each application in the workflow stays instantly identifiable.
 */
export function AppIcon({ id, size = 40, radius = 11 }: AppIconProps) {
  const logo = LOGOS[id];
  const glyphColor = logo.tile === 'brand' ? '#ffffff' : logo.color;
  const bg = TILE_BG[logo.tile](logo.color);
  const aspect = logo.aspect ?? 1;
  const glyphW = aspect >= 1 ? size * 0.56 : size * 0.56 * aspect;
  const glyphH = aspect >= 1 ? (size * 0.56) / aspect : size * 0.56;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow:
          logo.tile === 'light'
            ? 'inset 0 0 0 1px rgba(0,0,0,0.06)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <svg width={glyphW} height={glyphH} viewBox={logo.viewBox} aria-hidden="true">
        <path d={logo.path} fill={glyphColor} />
      </svg>
    </div>
  );
}
