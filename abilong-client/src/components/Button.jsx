import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-gradient-accent text-white hover:shadow-(--shadow-glow) hover:scale-[1.02] btn-glow-pulse",
  gradient:
    "bg-gradient-accent text-white hover:shadow-(--shadow-glow) hover:scale-[1.02] btn-glow-pulse",
  secondary:
    "border border-(--border) bg-(--glass) backdrop-blur-sm text-(--text) hover:border-(--accent-ring) hover:text-(--accent) hover:shadow-[0_0_12px_rgba(0,212,255,0.18)]",
  ghost:
    "text-(--muted) hover:text-(--accent) hover:bg-(--accent-soft)",
};

const Button = ({
  children,
  to,
  href,
  type = "button",
  variant = "primary",
  className = "",
  ...rest
}) => {
  const classes = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant] ?? variantClasses.primary,
    className,
  ].join(" ").trim();

  if (href) {
    // External links and documents (e.g. the CV PDF) open in a new tab
    const external = /^https?:|\.pdf$/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return <Link to={to} className={classes} {...rest}>{children}</Link>;
  }
  return <button type={type} className={classes} {...rest}>{children}</button>;
};

export default Button;
