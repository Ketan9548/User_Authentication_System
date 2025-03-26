import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Password_Restart = () => {
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Required").min(6, "Too Short!"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const { newPassword } = values;
                const token = window.location.pathname.split("/").pop();

                const response = await axios.post(`api/reset-password/${token}`, { newPassword });
                toast.success(response.data.message);

                setTimeout(() => {
                    window.location.href = "/signin";
                }, 3000);
            } catch (error) {
                toast.error("Your link has expired or is invalid.");
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">Reset Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="w-full p-2 border rounded-lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full p-2 border rounded-lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Password_Restart
