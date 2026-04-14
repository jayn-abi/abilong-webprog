import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:scale-[1.02] btn-glow-pulse",
  gradient:
    "bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:scale-[1.02] btn-glow-pulse",
  secondary:
    "border border-(--border) bg-(--glass) backdrop-blur-sm text-(--text) hover:border-[#00d4ff]/50 hover:text-[#00d4ff] hover:shadow-[0_0_12px_rgba(0,212,255,0.18)]",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer",
    variantClasses[variant] ?? variantClasses.primary,
    className,
  ].join(" ").trim();

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }
  return <button type={type} className={classes}>{children}</button>;
};

export default Button;
