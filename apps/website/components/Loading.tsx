export default function Loading() {
  return (
    <div className="flex gap-2">
      <p>Loading</p>
      <div className="flex gap-1 py-2">
        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
