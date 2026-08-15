function Avatar({ src, alt, size = "medium", initials }) {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-12 h-12 text-base",
    large: "w-16 h-16 text-xl",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  // Fallback: initials on a colored circle, when no image is available
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-500 text-white flex items-center justify-center font-medium`}
    >
      {initials}
    </div>
  );
}

export default Avatar;
