import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import { get } from "../../../api/productAPI"

const EditFormProduct = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useState();
    // history object lưu trữ hoàng loạt các Location (địa điểm hiện tại)
    // history cho phép các location di chuyển qua lại giữa các location
    const history = useHistory();
    // lấy url của params
    const { id } = useParams();
    // sử dụng state đển lấy và gán giá trị thay đổi của product khi edit
    const [ product, setProduct ] = useState({});

    useEffect(() => {
        const getProduct = async () => {
            try {
                const {data } = await get(id);
                setProduct(data);
                reset(data);
            } catch (error) {}
        }
        getProduct();
    }, [])

    // tạo ra một function dùng dể submit dữ liệu form lên server
    const onSubmit = (data) => {
        const newItem = {
            id,
            ...data
        };
        console.log(newItem);
        props.onEdit(newItem);
    };
    return (
        <>
            {JSON.stringify(product)}
      {/* {JSON.stringify(controlValue)} */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">cập nhật sản phẩm</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            defaultValue={product.name}
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
            defaultValue={product.price}
            className="form-control"
            {...register("price", { required: true })}
          />
          {errors.price && <span className="">required </span>}
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            {...register("status")}
            defaultValue={product.status}
          >
            <option value="true">Hết hàng</option>
            <option value="false">Còn hàng</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
        </>
    )
}

