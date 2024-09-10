import { FcGoogle } from "react-icons/fc";
import Button from "../ui/Button";
import signInWithGoogle from "../../services/firebase/auth/signInWithGoogle";
import { useNavigate } from "react-router-dom";

const GoogleSigninButton = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const ret = await signInWithGoogle();

    if (ret) navigate("/home");
  };

  return (
    <Button
      className="w-full flex justify-center items-center bg-white text-black mb-6 rounded-sm"
      onClick={handleSignIn}
    >
      <FcGoogle size={30} className="mr-2" /> Login With Google
    </Button>
  );
};

export default GoogleSigninButton;
