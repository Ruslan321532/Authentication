import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
// import '../index.css'

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="sections">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center">👍Login Success</h2>
        ) : (
          <div className="container">
            <h1 className="text-center">
              Welcome to <br /> to Geeks
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="text-center">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify} className="otpbtn">
                  {loading && <CgSpinner size={20} className="animate-spin" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="text-center">
                  Verify your phone number
                </label>
                <PhoneInput country={"KG"} value={ph} onChange={setPh} />
                <button onClick={onSignup} className="text-white rounded">
                  {loading && <CgSpinner size={20} className="animate-spin" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
