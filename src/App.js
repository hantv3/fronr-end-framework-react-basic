import { useEffect, useState } from "react";
import { add, getAll, remove, edit } from "./api/productAPI";
import Routes from "./Routes";

export default function App() {
  //render ra danh sách sản phẩm, sử dụng state
  const [ product, setProduct] = useState([]);
  // sử dụng useEffect render danh sách
  useEffect(() => {
    //  lấy dánh sách
    const getProduct = () => {
      //  dùng try catch để bắt các sự kiện và lỗi
      try {
        const { data } = await getAll();
        // lấy được dự liệu rồi thì setState product
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

}

export default App;
