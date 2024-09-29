import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { countercontext } from '../../Context/CounterContext';

export default function VerifyPassword() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  let { setuserLogin } = useContext(countercontext);

  function handleReset(values) {
    setLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((res) => {
        setLoading(false);
        
          navigate("/reset");
        
      })
      .catch((error) => {
        console.log(8);
        
        setErrors(error.response.data.message);
        setLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    resetCode: yup.string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleReset,
  });

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold flex justify-center'>Verify Code</h1>
        {errors && <div className='w-[100] flex justify-center text-red-600 font-bold text-2xl'>{errors}</div>}

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-24">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reset Code
            </label>
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.resetCode}</span>
            </div>
          )}

          <div className='flex justify-around items-center'>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
