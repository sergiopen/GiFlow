const SpinnerLoading = () => (
  <div className="flex justify-center items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className="block bg-blue-600 rounded-sm w-3 h-8"
        style={{
          animation: `wave 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes wave {
        0%, 40%, 100% {
          transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1);
        }
      }
    `}</style>
  </div>
);

export default SpinnerLoading;
