import { useForm } from 'react-hook-form'
const AddProductForm = (props) => {
   const {
    register,
    handleSubmit,
    formState: { errors }
   } = useForm();
   // Tạo ra một hàm submit dữ liệu thêm mới sản phẩm lên server
   const onSubmit = (data) => {
    //    tạo ra một đối tượng chưa thông tin từ form vì là dữ liệu json nên phải là đối tuọng
    const newItem = {
        // fake data id, toString() ép kiểu số thành chuỗi (string), substring() không làm thay đổi chuỗi bản đầu.
        id: ((Math.random() * 10000) + 1).toString(5).substring(5),
        ...data
    };
       console.log(newItem);
       props.onAdd(newItem);
   };
    return (
        <>
            {/* {JSON.stringify(controlValue)} */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">Quản lý sản phẩm</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                        <span className="d-block mt-2 text-danger">
              Bắt buộc phải nhập trường này
            </span>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá sản phẩm</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("price")}
                    />
                </div>
                <div className="mb-3">
                    <select className="form-control" {...register("status")}>
                        <option value="0">Hết hàng</option>
                        <option value="1">Còn hàng</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm sản phẩm
                </button>
            </form>
        </>
    );
}