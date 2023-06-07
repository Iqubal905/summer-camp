import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import img from '../../assets/slider/sigi in.webp'
import { AuthContext } from '../../provider/AuthProvider';
import GoogleLogin from '../shared/GoogleLogin/GoogleLogin';
import Swal from 'sweetalert2';




const SignUp = () => {
  const {createUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
     const [conPass, setConPass] = useState('')
    
     const navigate = useNavigate();

     const location = useLocation()
     const from = location.state?.from?.pathname || "/";

    
    const onSubmit = data => {
      
      if(data.password !== data.conPass){
        setConPass("Don't match password")
        return
      }
      else{
        setConPass('')
        console.log(data);
        createUser(data.email, data.password)
      
        .then(result =>{
          const user = result.user;
          console.log(user);

          Swal.fire({
            title: 'Register Successful.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

          navigate(from, { replace: true })
      })
      .catch(error => console.log(error))
  

    
      }
    };






    return (
        <div>
           

<div className="hero min-h-screen bg-base-200">

  <div className="hero-content ">
  
   <div className='grid grid-cols-2'>
   <div className="flex justify-items-center justify-self-center lg:text-left">
  
     <img src={img} alt="" />
    </div>

    <div className="card   flex w-full max-w-sm shadow-2xl bg-base-100 p-0 m-0">
    <h1 className="text-3xl font-bold text-center ">Sign Up now!</h1>
      <div className="card-body py-0 pl-12">
     <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Name</span>
  </label>
  <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered w-full max-w-xs" />
  </div>
  <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Email</span>
  </label>
  <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
  </div>
  <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input type="text" {...register("password", {
    
    required: true,
    minLength: 6,
    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
    
    })} name="password" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
  
  </div>
  {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
  {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be minimum 6 characters</p>}
  {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

  <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Confirm Pasword</span>
  </label>
  <input type="text" {...register("conPass", { required: true })} name="conPass" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
    <h2 className=' text-red-400 text-2xl'>{conPass}</h2>
  </div>
  <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Photo Url</span>
  </label>
  <input type="text" {...register("photoUrl", { required: true })} name="photoUrl" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
  </div>
 
 
  <div className="form-control mt-6">
  <input  className="btn btn-outline btn-primary" type="submit" />
         
        </div>
        
    </form>
    <p><small>Already have an account <Link to="/login" className=' underline  text-blue-600'>Login</Link></small></p>
      <GoogleLogin></GoogleLogin>
      </div>
    </div>
   </div>
  </div>
</div>
        </div>
    );
}

export default SignUp;