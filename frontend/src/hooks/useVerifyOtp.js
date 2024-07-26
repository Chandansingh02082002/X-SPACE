import { appLogout, emailVerified } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const useVerifyOtp = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((e) => e.auth);
    const verifyOtp = async (otp) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/verify`, {
                method: "POST",
                body: JSON.stringify({ otp }),
                headers: { "Constent-Type": "application/json",
                            authorization: `Bearer ${token}`,

                },
            });
            const data = await res.json();
            alert(data.message);
            if (data.status === "Unauthorized") {
                dispatch(appLogout());
            } else if (data.message === "success") {
                dispatch(emailVerified());
            }
            else {

                alert(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    return { verifyOtp };
};

export default useVerifyOtp;