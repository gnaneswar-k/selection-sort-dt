"use client" // Client-side Component to allow for state changes.

export default function ArrayElement({
  value,
  index,
  handler,
  highlight
}: {
  value: any
  index: number
  handler?: Function
  highlight?: boolean
}) {
  return (
    <span
      className={"flex justify-center p-3 border-2 border-sky-600 rounded-lg "
        + (highlight ? "border-dashed bg-yellow-300" : "border-solid bg-sky-300")}
      key={index}
      onClick={handler ? () => handler() : handler}
    >
      {value}
    </span>
  )
}
