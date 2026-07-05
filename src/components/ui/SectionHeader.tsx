import { Button } from "./Button";
import { Link } from "@/i18n/navigation";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  description,
  action,
  centered = false,
  className = "",
  children,
}: SectionHeaderProps & { children?: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col md:flex-row ${centered ? "md:items-center md:justify-center text-center" : "md:items-end md:justify-between"} gap-5 mb-5 ${className}`}
    >
      <div className={`max-w-[700px] ${centered ? "mx-auto" : ""}`}>
        {label && (
          <span className="font-jost text-[10px] md:text-[11px] tracking-[4px] md:tracking-[6px] uppercase text-gold block mb-4 animate-[fadeUp_0.8s_ease-out]">
            {label}
          </span>
        )}

        <h2 className="font-cormorant text-[clamp(32px,6vw,60px)] font-light leading-[1.1] text-text-dark mb-2.5 md:mb-0 animate-[fadeUp_1s_ease-out]">
          {title}{" "}
          {subtitle && <span className="italic text-gold">{subtitle}</span>}
        </h2>

        {description && (
          <p className="font-jost text-sm md:text-base text-text-mid font-light leading-relaxed max-w-[600px] animate-[fadeUp_1.2s_ease-out]">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-4 animate-[fadeUp_1.4s_ease-out]">
        {children}
        {action && (
          <Link href={action.href}>
            <Button variant="outline" size="sm">
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
