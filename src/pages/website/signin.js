import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { signin } from "api/authAPI";
import { isAuthenticated, authenticate } from "auth";

// tạo ra một hàm thực hiện công việc signin đăng nhập vào trong hệ thống
const Signin = () => {
    // lấy id khi người dùng đăng nhập
    const {id} = isAuthenticated();
    // do dùng form để submit nên sẽ sử dụng register, handleSubmit
    const { register, handleSubmit } = useForm();
    // lấy lỗi và thay đổi lỗi theo ý muốn dùng useState, mặt định phần này sẽ để trống
    const { error, setError } = useState("");
    // lấy thông báo thành công và thay đổi thông báo như ý muốn sử dụng useState
    // mặt định sẽ là false vì sẽ là chưa đăng nhập
    const { success, setSuccess } = useState(false);
    // tạo một hàm thực hiện công việc submit thông tin của user đăng nhập và đối chiếu với db để đăng nhập.
    const onSubmit = async (user) => {
        //  dùng try catch để bắt sự kiện
        try {
            const {data} = await signin(user);
            authenticate(data); // set thông tin vào local storage
            setSuccess(true);
        } catch (error) {
            //  nếu có lỗi thì bắn lỗi ra ngoài
            setError(error.response.data);
        }
    };
    // chuyển hướng người dùng sau khi đăng nhập thành công hoặc không
    const redirectUse = () => {
        if( success ){
            if( id == 1){
                <Redirect to="/admin"/>;
            }else{
                <Redirect to="/"/>;
            }
        }
    };
    return (
        <div className="col-6 mx-auto mt-2">
          {redirectUser()}
          <h2> Đăng nhập</h2>
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          <form action="" onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register("email")} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Đăng nhập
            </button>
          </form>
        </div>
      );
}
export default Signin;