type ProfileAvatarProps = {
  className: string;
};

const ProfileAvatar = ({ className }: ProfileAvatarProps) => {
  return (
    <div
      className={`flex gap-2 p-3 hover:bg-primary cursor-pointer rounded-r-md transition-all ${className}`}
    >
      <span className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-accent rounded-full">
        DJ
      </span>
      <div className="flex flex-1 flex-col justify-evenly overflow-hidden">
        <h3 className="text-xl m-0 text-ellipsis overflow-hidden whitespace-nowrap">
          Dohn Joe
        </h3>
        <span className="text-secondary-text text-ellipsis overflow-hidden whitespace-nowrap">
          dohnjoe@outlook.com
        </span>
      </div>
    </div>
  );
};

export default ProfileAvatar;
