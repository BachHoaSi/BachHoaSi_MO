// import React, { useEffect, useState } from "react";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { Box, Page, Spinner } from "zmp-ui";
// import ButtonPriceFixed from "../components/button-fixed/button-price-fixed";
// import CategoriesStore from "../components/categories-store";
// import CardProductHorizontal from "../components/custom-card/card-product-horizontal";
// import { filter } from "../constants/referrence";
// import { Product } from "../models";
// import {
//   activeCateState,
//   activeFilterState,
//   cartState,
//   cartTotalPriceState,
//   productState,
// } from "../state";
// import { useNavigate } from "react-router-dom";
// import useSetHeader from "../hooks/useSetHeader";
// import { changeStatusBarColor } from "../services";
// import { getConfig } from "../components/config-provider";
// import api from "../services/api";
// import ButtonFixed from "../components/button-fixed/button-fixed";

// const Menu = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCate, setActiveCate] = useRecoilState(activeCateState);
//   const [activeFilter, setActiveFilter] = useRecoilState(activeFilterState);
//   const cart = useRecoilValue(cartState);
//   const totalPrice = useRecoilValue(cartTotalPriceState);
//   const setProductState = useSetRecoilState(productState);
//   const navigate = useNavigate();
//   const setHeader = useSetHeader();

//   useEffect(() => {
//     const fetchMenuProducts = async () => {
//       try {
//         const storeId = sessionStorage.getItem("storeId");
//         const response = await api.get<{ data: { content: Product[] } }>(
//           "/menu",
//           {
//             params: {
//               page: 0,
//               size: 10,
//               storeId: storeId,
//             },
//           }
//         );
//         setProducts(response.data.data.content);
//         setProductState(response.data.data.content);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching menu products:", error);
//         setLoading(false);
//       }
//     };

//     fetchMenuProducts();

//     setHeader({
//       customTitle: getConfig((c) => c.template.searchBar) ? "" : "",
//       hasLeftIcon: false,
//       type: "secondary",
//     });
//     changeStatusBarColor("secondary");
//   }, []);

//   return (
//     <Page>
//       {loading ? (
//         <div className=" w-screen h-screen flex justify-center items-center">
//           <Spinner />
//         </div>
//       ) : (
//         <>
//           <div className="bg-primary">
//             <CategoriesStore
//               categories={products.map((p) => p.product.categoryName)}
//               activeCate={activeCate}
//               setActiveCate={(index) => setActiveCate(index)}
//               activeFilter={activeFilter}
//               setActiveFilter={setActiveFilter}
//               filter={filter}
//               quantity={products.length}
//             />
//           </div>
//           <div className="bg-gray-100 h-3" />
//           <div
//             className="bg-white p-3"
//             style={{ marginBottom: totalPrice > 0 ? "120px" : "0px" }}
//           >
//             {products.map((product) => (
//               <div className=" mb-2 w-full" key={product.id}>
//                 <CardProductHorizontal
//                   pathImg={product.product.urlImage}
//                   nameProduct={product.product.name}
//                   salePrice={product.price}
//                   retailPrice={product.product.basePrice}
//                   productId={product.id}
//                 />
//               </div>
//             ))}
//           </div>
//           {totalPrice > 0 && (
//             <>
//               <ButtonPriceFixed
//                 quantity={cart.listOrder.length}
//                 totalPrice={totalPrice}
//                 handleOnClick={() => {
//                   navigate("/finish-order");
//                 }}
//               />
//               <ButtonFixed
//                 listBtn={[
//                   {
//                     id: 1,
//                     content: "Hoàn tất đơn hàng",
//                     type: "primary",
//                     onClick: () => {
//                       navigate("/finish-order");
//                     },
//                   },
//                 ]}
//                 zIndex={99}
//               />
//             </>
//           )}
//         </>
//       )}
//     </Page>
//   );
// };

// export default Menu;
