import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Button, Modal } from "bootstrap/dist/js/bootstrap.bundle";

export default function Brands() {
  const [brandInfoList, setInfoList] = useState([]);
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isLoading } = useQuery("brands", getBrands, {});

  async function specificBrand(id) {
    let data = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    setInfoList(data.data.data);
    console.log(brandInfoList);
  }

  return (
    <div className="">
      <div className="row row-cols-1 row-cols-md-3 g-4 my-3 nav-m">
        {!isLoading ? (
          <>
            {data?.data.data.map((brand) => {
              return (
                <div
                  onClick={() => {
                    specificBrand(brand._id);
                  }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <div className="col brands overflow-hidden ">
                    <div className="card">
                      <div className="card-body text-center">
                        <img src={brand.image} alt="" />
                        <p className="card-text fs-3 text-success">
                          {brand.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="vh-100 d-flex justify-content-center align-items-center w-100">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-between align-items-center">
              <div>
              <p className="fs-3 text-success">{brandInfoList.name}</p>
              <span>{brandInfoList.slug}</span>
              </div>
              <img src={brandInfoList.image} alt="" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
