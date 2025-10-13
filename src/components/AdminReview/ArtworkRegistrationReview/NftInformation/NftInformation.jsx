import { React, useDebugValue, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
export const Nft = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const artwork = location.state?.artwork;
  const [statusFilter, setStatusFilter] = useState("information");
  const handleViewList = () => {
    navigate("/register");
  };

  if (!artwork) {
    return <p>Artwork not found</p>;
  }
/* --------- */
  return (
    <div className="NftInformation">
      <div className="div">
        {/* Header */}
        <div className="b-tart-wrapper">
          <div className="b-tart">BTART</div>
        </div>

        {/* Footer */}
        <div className="frame-2">
          <div className="frame-3" />
          <div className="frame-4">
            <div className="text-wrapper">Terms of Use</div>
            <div className="ellipse" />
            <div className="text-wrapper">Privacy Policy</div>
            <div className="ellipse" />
            <div className="text-wrapper">Contact Us</div>
          </div>
          <p className="p">© 2025 BTART. ALL RIGHTS RESERVED</p>
          <img className="line" alt="Line" src="/img/line-6.svg" />
        </div>

        {/* Dashboard Link */}
        <div className="frame-5">
          <div className="group">
            <div className="arrow-wrapper">
              <img className="arrow" alt="Arrow" src="/img/arrow-4.svg" />
            </div>
          </div>
          <div className="text-wrapper-2" onClick={handleViewList}>Dashboard</div>
        </div>

        {/* Artwork Info Sections */}
        {statusFilter === "information" && (
          <div>
            {/* 新建双标签*/}
            <div className="frame-11-nft">
              <div className="frame-12">
                <div className="text-wrapper-3">Token Name</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.tokeName || "N/A"}</div>
                </div>
              </div>
              <div className="frame-12">
                <div className="text-wrapper-3">Token Symbol</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.Symbol || "$JD"}</div>
                </div>
              </div>
            </div>

            <div className="frame-12-nft">
              <div className="frame-12">
                <div className="text-wrapper-3">Total Supply</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.Supply || "10,000,000,000"}</div>
                </div>
              </div>
              <div className="frame-12">
                <div className="text-wrapper-3">Decimal Places</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.Places || "8"}</div>
                </div>
              </div>
            </div>

            <div className="frame-13-nft">
              <div className="frame-12">
                <div className="text-wrapper-3">Initial Price</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.Price || "$0.02"}</div>
                </div>
              </div>
              <div className="frame-12">
                <div className="text-wrapper-3">Blockchain Network</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork.Network || "Ethereum"}</div>
                </div>
              </div>
            </div>
            {/* 新建单标签 */}

            <div className="frame-6-nft">
              <div className="text-wrapper-3">Presale Starting Date</div>
              <div className="rectangle" />
              <div className="frame-7">
                <div className="text-wrapper-4">{artwork.Date || "25 July 2025 0:00 UTC"}</div>
              </div>
            </div>

             <div className="frame-7-nft">
              <div className="text-wrapper-3">Presale Duration (Days)</div>
              <div className="rectangle" />
              <div className="frame-7">
                <div className="text-wrapper-4">{artwork.Duration || "10"}</div>
              </div>
            </div>
             <div className="frame-8-nft">
              <div className="text-wrapper-3">Token to Purchase</div>
              <div className="rectangle" />
              <div className="frame-7">
                <div className="text-wrapper-4"> {artwork.Duration || " 1,000,000,000"}</div>
              </div>
            </div>

          </div>
        )}
        {statusFilter === "owner" && (
          <div>
            <div className="frame-6">
              <div className="text-wrapper-3">Data of Birth</div>
              <div className="rectangle" />
              <div className="frame-7">
                <div className="text-wrapper-4">{artwork.Birth || "1992 May 30"}</div>
              </div>
            </div>
            <div className="frame-14">
              <div className="text-wrapper-3">Name</div>
              <div className="frame-15">
                <div className="rectangle" />
                <div className="frame-16">
                  <div className="text-wrapper-4">{artwork.name || "Harry Potter"}</div>
                </div>
              </div>
            </div>
            <div className="frame-owenr-1">
              <div className="text-wrapper-frame-owenr-1">Nationlity</div>
              <div className="frame-15">
                <div className="rectangle" />
                <div className="frame-16">
                  <div className="text-wrapper-4">{artwork.Nationlity || "Hong Kong China"}</div>
                </div>
              </div>
            </div>
            <div className="frame-owenr-2">
              <div className="text-wrapper-frame-owenr-2">Email Address</div>
              <div className="frame-15">
                <div className="rectangle" />
                <div className="frame-16">
                  <div className="text-wrapper-4">{artwork.address || "123123@gamil.com"}</div>
                </div>
              </div>
            </div>
            <div className="frame-owenr-3">
              <div className="text-wrapper-frame-owenr-3">Telephone Number</div>
              <div className="frame-15">
                <div className="rectangle" />
                <div className="frame-16">
                  <img className="image" alt="Image" src="/img/image-129.png" />
                  <img
                    className="vector"
                    alt="Vector"
                    src="/img/vector-110.svg"
                  />
                  <div className="text-wrapper-4">{artwork.Telephone || "+852 52341234"}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 页面切换 */}
        <div className="frame-21">
          <div
            className="frame-22"
            onClick={() => setStatusFilter("information")}
          >
            <div className="text-wrapper-8">Token Setting</div>
            {statusFilter === "information" && <div className="rectangle-3" />}
          </div>
          <div
            className="frame-22"
            onClick={() => setStatusFilter("owner")}

          >
            <div className="text-wrapper-8">Creator Information</div>
            {statusFilter === "owner" && <div className="rectangle-4" />}
          </div>
        </div>
        <img className="line-2" alt="Line" src="/img/line-8.svg" />
        {/* 公共页面基本信息显示 */}
        <div className="frame-23">
          <div className="frame-24">
            <img className="rectangle-5" alt="Rectangle" src={artwork.thumbnail || "/img/rectangle-5025.png"} />
            <div className="frame-25">
              <div className="frame-26">
                <div className="text-wrapper-10">{artwork.title} - Register</div>
              </div>
              <div className="frame-27">
                <p className="text-wrapper-11">
                  Creator: {artwork.creator || "N/A"} | Creation Year: {artwork.creationYear || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="frame-28">
            <div className="frame-29">
              <div className="text-wrapper-4">Approve</div>
              <img className="arrow-2" alt="Arrow" src="/img/arrow-1.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
