const DotsLoader = () => {
  return (
    <div className="flex  justify-center items-center bg-white dark:invert gap-0.5 h-2">
      <span className="sr-only">Loading...</span>
      <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default DotsLoader;
