export default function AdSensePlaceholder({ slot }: { slot?: string }) {
  return (
    <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center my-8 text-gray-500 rounded-md">
      <p>AdSense Placeholder {slot ? `(Slot: ${slot})` : ""}</p>
    </div>
  );
}