import { Circle, G, Path, Svg, View } from "@react-pdf/renderer";
import { PLANE_PATH } from "./icons";

/**
 * Decoración del PDF en SVG (react-pdf): manchas de color, estrellitas, brújula y flechas de ruta.
 * Todo en tonos de la paleta azul de la marca; la variación sale de la opacidad, no de colores nuevos.
 */
export const DECO = {
  accent: "#25436b",
};

/** Avión (silueta Material, apunta hacia arriba) colocado por centro, tamaño en pt y rotación en grados. */
function Plane({
  cx,
  cy,
  size,
  rotate,
  color,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  size: number;
  rotate: number;
  color: string;
  opacity?: number;
}) {
  const s = size / 24;
  return (
    <G
      transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${s}) translate(-12 -12)`}
    >
      <Path d={PLANE_PATH} fill={color} fillOpacity={opacity} />
    </G>
  );
}

function Compass({
  cx,
  cy,
  r,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
}) {
  const s = r / 20;
  return (
    <G transform={`translate(${cx} ${cy}) scale(${s})`}>
      <Circle
        cx={0}
        cy={0}
        r={20}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeOpacity={0.55}
        strokeWidth={1.4}
      />
      <Circle
        cx={0}
        cy={0}
        r={15}
        fill="none"
        stroke={color}
        strokeOpacity={0.3}
        strokeWidth={0.8}
        strokeDasharray="1.5 2.5"
      />
      <Path
        d="M0 -20V-16M20 0H16M0 20V16M-20 0H-16"
        stroke={color}
        strokeOpacity={0.7}
        strokeWidth={1.4}
      />
      <G transform="rotate(40)">
        <Path d="M0 -12 4 0H-4Z" fill={color} />
        <Path d="M0 12 4 0H-4Z" fill={color} fillOpacity={0.35} />
      </G>
      <Circle cx={0} cy={0} r={1.8} fill="#ffffff" />
    </G>
  );
}

function Sparkle({
  x,
  y,
  size = 4,
  color,
  opacity = 0.5,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  opacity?: number;
}) {
  const s = size;
  return (
    <Path
      d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`}
      fill={color}
      fillOpacity={opacity}
    />
  );
}

/** Fondo de la página (se dibuja antes que el contenido). Coordenadas en pt sobre una A4 (595×842). */
export function PageDecorations() {
  const { accent } = DECO;
  return (
    // View absoluta: un <Svg> suelto ocupa lugar en el flujo y empuja el contenido a otra página.
    <View
      fixed
      style={{ position: "absolute", top: 0, left: 0, width: 595, height: 842 }}
    >
      <Svg width={595} height={842} viewBox="0 0 595 842">
        {/* Manchas suaves de color */}
        <Path
          d="M595 84V300C560 318 520 282 498 244 476 206 430 188 398 158 372 134 410 84 450 84Z"
          fill={accent}
          fillOpacity={0.07}
        />
        <Path
          d="M0 610C54 618 104 662 124 712 144 762 100 800 144 842H0Z"
          fill={accent}
          fillOpacity={0.08}
        />
        <Path
          d="M595 720C560 736 540 770 502 796 474 816 486 832 474 842H595Z"
          fill={accent}
          fillOpacity={0.07}
        />

        <Sparkle x={560} y={196} size={3} color={accent} opacity={0.4} />

        <Sparkle x={572} y={470} size={3.5} color={accent} opacity={0.4} />

        {/* Brújula abajo a la derecha */}
        <Compass cx={556} cy={800} r={22} color={accent} />
      </Svg>
    </View>
  );
}

/** Flecha de ruta punteada. Con `plane`, termina en un avioncito en lugar de la punta de flecha. */
export function RouteArrow({
  color,
  plane = false,
}: {
  color: string;
  plane?: boolean;
}) {
  return (
    <Svg
      width={plane ? 50 : 46}
      height={14}
      viewBox={plane ? "0 0 50 14" : "0 0 46 14"}
    >
      <Path
        d={plane ? "M1 7H34" : "M1 7H38"}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray="3 3"
        fill="none"
      />
      {plane ? (
        <Plane cx={42} cy={7} size={13} rotate={90} color={color} />
      ) : (
        <Path
          d="M34 2.5 41 7 34 11.5"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </Svg>
  );
}
