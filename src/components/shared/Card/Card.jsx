function Card({ title, children, footer }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      )}
      <div className="text-gray-600">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>}
    </div>
  );
}

export default Card;
