import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password_Fogot = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:9000/api/forgotpassword", values);
                toast.success(response.data.message || "Email sent successfully!");
            } catch (error) {
                if (error.response?.status === 404) {
                    toast.error("Email not found");
                } else {
                    toast.error("Server error, please try again later");
                }
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded-lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Password_Fogot
