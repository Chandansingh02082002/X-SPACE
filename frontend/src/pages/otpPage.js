import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyOtp";

const OtpPage = () => {
    useEffect(()=>{
        document.body.style.margin = "0";
        document.body.style.height = "100%";
        document.body.style.backgroundImage = "url('https://getwallpapers.com/wallpaper/full/a/b/c/23940.jpg')";
        document.body.style.backgroundSize="cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.height="100vh";
    });
    const { email } = useSelector((e) => e.auth);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const { generateNewOtp } = useGenerateNewOtp();
    const { verifyOtp } = useVerifyOtp();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length > 1) return; // Prevent entering more than one character

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus on the next input if a digit is entered
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = () => {
        const otpValue = otp.join("");
        if (otpValue.length < 4) {
            alert("Invalid OTP");
        } else {
            const num = parseInt(otpValue);
            if (num >= 1000 && num <= 9999) {
                verifyOtp(num);
            } else {
                alert("Invalid OTP. OTP must be Number");
            }
        }
    };

    useEffect(() => {
        generateNewOtp();
    }, []);

    return (
        <>
            <Navbar />
            <div className="otp-page-container">
                <p style={{color:"white"}}>Email: {email}</p>
                <div className="otp-input-container">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            maxLength={1}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <button onClick={handleSubmit} style={{ height: "30px",
                                                        width: "50px",
                                                        borderRadius: "5px",
                                                        backgroundColor: "rgba(255,255,255,0.2)",
                                                        boxShadow:" 0 0 0 1px black",
                                                         cursor:"pointer"
                                                      }}>Verify</button>
            </div>
        </>
    );
};

export default OtpPage;