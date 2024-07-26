import { useEffect, useState } from "react";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
    useEffect(()=>{
        document.body.style.margin = "0";
        document.body.style.height = "100%";
        document.body.style.backgroundImage = "url('https://getwallpapers.com/wallpaper/full/a/b/c/23940.jpg')";
        document.body.style.backgroundSize="cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.height="100%";
    });
    const signupPageStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "auto",
        padding: "24px",
        backgroundColor:"rgba(255,255,255,0.4)",
        width:"400px",
        height:"400px",
        borderRadius:"20px",
        
    };
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({ email, password });
        } else {
            alert("Validation Failed");
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    
            <div style={signupPageStyles}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={{ padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '2px solid black' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{ padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '2px solid black' }}
                        />
                    </div>
                    <button onClick={handleSubmit} style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#0096FF', color: 'white', fontWeight: 'bold', cursor:'pointer' }}>Sign Up</button>
            </div>
        </div>
        );
};

export default SignupPage;
