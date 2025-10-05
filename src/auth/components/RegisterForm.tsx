import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth-store";

export function RegisterForm() {
    const navigate = useNavigate();
    const { user, setUser, register, error } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ [name]: value });
    };

    return (
        <div className="w-full font-mulish text-neutral-700 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label htmlFor="username">Nombre</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                    value={user.username}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@mail.com"
                    className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2 relative justify-center">
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm pr-10"
                    value={user.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="absolute right-3 top-10 text-neutral-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>

            <div className="flex flex-col gap-2 relative">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    className="focus:outline-none border-1 border-neutral-300 px-3 py-2 rounded-sm pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-3 top-10 text-neutral-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button
                variant="contained"
                className="bg-brand-default"
                sx={{ textTransform: "none" }}
                onClick={() => register(confirmPassword, () => navigate('/dashboard'))}
            >
                <span className="font-mulish text-lg">
                    Registrarse
                </span>
            </Button>
        </div>
    );
}
