import User from "./User"
import useOnlineStatus from "../utils/useOnlineStatus";
import InternetStatus from "./InternetStatus";

const About = () => {

  const status = useOnlineStatus();

  if (status === false) return <InternetStatus />;
  
  return (
    <User name={"Pritam Roy Chowdhury"} location={"Kolkata, West Bengal"} />
  )
}

export default About;