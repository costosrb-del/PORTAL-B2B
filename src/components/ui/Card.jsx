import { clsx } from 'clsx';

const Card = ({
    children,
    className = '',
    variant = 'default',
    hover = false,
    onClick
}) => {
    const variants = {
        default: 'bg-white shadow-soft',
        elevated: 'bg-white shadow-medium',
        interactive: 'bg-white shadow-soft hover:shadow-medium transition-shadow duration-200 cursor-pointer',
    };

    return (
        <div
            className={clsx(
                'rounded-lg',
                variants[variant],
                hover && 'hover:shadow-medium transition-shadow duration-200',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
