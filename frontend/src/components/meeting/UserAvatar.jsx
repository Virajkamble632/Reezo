const UserAvatar = ({ name, size = "h-24 w-24", text = "text-4xl" }) => {
  return (
    <div
      className={`flex ${size} items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg`}
    >
      <span className={`${text} font-bold text-white`}>
        {name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default UserAvatar;