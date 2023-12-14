"use client" // Client-side Component to allow for state changes.

export default function ActionButton({
  children,
  type,
  id,
  disabled,
  handler,
}: {
  children: React.ReactNode
  type?: "primary" | "secondary"
  id?: string
  disabled?: boolean
  handler?: Function
}) {
  return (
    <button
      type="button"
      id={id}
      className={"flex m-2 p-3 justify-center items-center "
        + "rounded-md shadow-md "
        + (disabled ? "" : "transition ease-out hover:scale-105 hover:duration-300 ")
        + (type === "primary"
          ? (disabled ? "bg-green-200" : "bg-green-300")
          : type === "secondary"
            ? (disabled ? "bg-orange-200" : "bg-orange-300")
            : (disabled ? "bg-amber-200" : "bg-amber-300")
        )
      }
      onClick={handler ? () => handler() : handler}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
