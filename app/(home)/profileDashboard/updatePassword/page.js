'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
    const [email, setEmail] = useState(null);
    const [reload, setReload] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

  
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if (userInfo?.email) {
            setEmail(userInfo.email);
        }
    }, []);

    // Update formData when email is set
    useEffect(() => {
        if (email) {
            setFormData(prevState => ({ ...prevState, email }));
        }
    }, [email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized: No token found. Please log in again.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/customer/update-password`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );


            toast.success("Password updated successfully!");
            setFormData({
                email,
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            });
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-800 mb-4 text-center">
                Update Password
            </h2>
           
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    name="current_password"
                    placeholder="Current Password"
                    value={formData.current_password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-100 text-black"
                    required
                />
                <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-100 text-black"
                    required
                    minLength={8}
                />
                <input
          type="password"
          name="new_password_confirmation"
          placeholder="Confirm New Password"
          value={formData.new_password_confirmation}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-100 text-black"
          required
        />
                <button
                    type="submit"
                    className="w-full bg-teal-800 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default Page;
