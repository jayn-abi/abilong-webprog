import { Link } from "react-router-dom";

const variantClasses = {
    gradient:
        "bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white hover:shadow-lg hover:shadow-[#4f46e5]/50 transition-all hover:scale-105",
    secondary: 
    "bg-zinc-50 text-zinc-900 hover:bg-zinc-200", 
    
}; 

const Button = ({
    children, 
    to, 
    type = "button",
    variant = "gradient",
    className = "",
}) => {
    const classes = [
  "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-200",
  variantClasses[variant] ?? variantClasses.gradient,
  className,
].join(" ").trim();

    if (to){
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes}>
            {children}
        </button>
    ); 
}; 

export default Button;