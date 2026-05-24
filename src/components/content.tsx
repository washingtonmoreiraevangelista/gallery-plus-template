import cx from "classnames";

interface ContenteProps extends React.ComponentProps<"main"> {}

export default function Content({
    children,
    className,
    ...props
}: ContenteProps) {
    return (
        <main
            className={cx("mt-20 pb-20", className)}
            {...props}
        >
            {children}
        </main>
    )

}