const UserIcon = ({ src, size }) => {
  const defaultIcon = `https://img.icons8.com/color/${
    size || 64
  }/000000/user-male-circle--v1.png`;
  return (
    <img
      className="profile-img"
      height={size || "60"}
      width={size || "60"}
      src={src || defaultIcon}
      alt="profile"
    />
  );
};

export default UserIcon;
