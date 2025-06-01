import useOnlineStatus from "../utils/useOnlineStatus";
import InternetStatus from "./InternetStatus";

const Contact = () => {
  const status = useOnlineStatus();

  if (status === false) return <InternetStatus />;
  return <h1>Contact Us</h1>;
};

export default Contact;
