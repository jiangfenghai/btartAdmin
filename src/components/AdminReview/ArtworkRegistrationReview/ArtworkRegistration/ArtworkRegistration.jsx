import React, { useState } from "react";
import "./style.css";
import { SearchLight } from "../../../../icons/SearchLight/SearchLight";
import { CheckRingDuotone1 } from "../CheckRingDuotone1/CheckRingDuotone1"
import { useNavigate } from "react-router-dom";
import { DellFillLight } from "../DellFillLight/DellFillLight"
import { MyApps } from "../../../MyApps";
import { useAccount } from "wagmi";
const artworks = [
  {
    id: 1,
    artist: "Jenya Datsko",
    title: "Sunset Waves",
    submitter: "Harry Potter",
    status: "pending",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "120x80x4",
  },
  {
    id: 2,
    artist: "Jenya Datsko",
    title: "City Lights",
    submitter: "Hermione",
    status: "pending",
    year: "2021",
    medium: "Acrylic",
    dimensions: "100x100x5",
  },
  {
    id: 3,
    artist: "Jenya Datsko",
    title: "City Lights",
    submitter: "Hermione",
    status: "approved",
    year: "2021",
    medium: "Acrylic",
    dimensions: "100x100x5",
  }, {
    id: 4,
    artist: "Jenya Datsko",
    title: "City Lights",
    submitter: "Hermione",
    status: "approved",
    year: "2021",
    medium: "Acrylic",
    dimensions: "100x100x5",
  }, {
    id: 5,
    artist: "Jenya Datsko",
    title: "City Lights",
    submitter: "Hermione",
    status: "rejected",
    year: "2021",
    medium: "Acrylic",
    dimensions: "100x100x5",
  },
  {
    id: 6,
    artist: "Jenya Datsko",
    title: "City Lights",
    submitter: "Hermione",
    status: "rejected",
    year: "2021",
    medium: "Acrylic",
    dimensions: "100x100x5",
  },
];

export const Register = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const [tab, setTab] = useState("artwork");
 const {address} =useAccount();
 console.log('addrss',address)
  const filteredArtworks = artworks.filter((a) => a.status === statusFilter);

  const count = {
    pending: artworks.filter((a) => a.status === "pending").length,
    approved: artworks.filter((a) => a.status === "approved").length,
    rejected: artworks.filter((a) => a.status === "rejected").length,
  };
  // 在组件内定义 navigate
  const navigate = useNavigate();
  const handleViewArtwork = (artwork) => {
    navigate(`/register/${artwork.id}`, { state: { artwork } });
  };
   const handleViewNft = (artwork) => {
    navigate(`/nftinfo/${artwork.id}`, { state: { artwork } });
  };

  return (
    <div className="ArtworkRegister">
      <div className="div">
        {/* 顶部静态布局保留 */}
        <div className="frame">
          <div className="b-tart">BTART</div>
        </div>
        {/* 艺术品审核页面 */}
        <MyApps isLoginFirst={false} />
        {tab === "artwork" && (
          <div>
            {/* 状态 切换区 */}
            <div className="frame-13">
              {(() => {
                if (statusFilter === "pending") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("pending")}>
                      <div className="text-wrapper-7">
                        Pending Artworks ({count.pending})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("pending")}>
                      <div className="text-wrapper-5">
                        Pending Artworks ({count.pending})
                      </div>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (statusFilter === "approved") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("approved")}>
                      <div className="text-wrapper-7">
                        Approved ({count.approved})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("approved")}>
                      <div className="text-wrapper-5">
                        Approved ({count.approved})
                      </div>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (statusFilter === "rejected") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("rejected")}>
                      <div className="text-wrapper-7">
                        Rejected ({count.rejected})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("rejected")}>
                      <div className="text-wrapper-5">
                        Rejected ({count.rejected})
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
            {/* 作品列表部分 */}
            <div className="frame-5">
              {filteredArtworks.map((art) => (
                <div className="frame-6" key={art.id}>
                  <div className="frame-7">
                    <img
                      className="rectangle"
                      alt="Rectangle"
                      src="/img/rectangle-5024.png"
                    />

                    <div className="frame-8">
                      <div className="frame-wrapper">
                        <div className="frame-9">
                          <div className="text-wrapper-2">{art.artist}</div>
                          <div className="div-wrapper">
                            <div className="text-wrapper-3">Artwork</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-wrapper-4">Submitted by: {art.submitter}</div>
                    </div>
                  </div>

                  <img className="img" alt="Line" src="/img/line-7-7.svg" />

                  <div className="frame-10">
                    {/* 待审核状态 */}
                    {art.status === "pending" && (
                      <>
                        <div className="frame-11">
                          <div className="frame-12 action-approve">
                            <div className="text-wrapper-5">Approve</div>
                            <img className="arrow" alt="Arrow" src="/img/arrow-1.svg" />
                          </div>
                        </div>

                      </>
                    )}

                    {art.status === "approved" && (
                      <div className="frame-11">
                        <div className="frame-12-approved">
                          <div className="text-wrapper-5-approved">Approved</div>
                          <CheckRingDuotone1 />
                        </div>
                      </div>
                    )}

                    {/* 审核拒绝 */}
                    {art.status === "rejected" && (
                      <div className="frame-11">
                        <div className="frame-12-reject">
                          <div className="text-wrapper-5-reject">Rejected</div>
                          <DellFillLight />
                        </div>
                      </div>
                    )}
                    <div className="text-wrapper-6" onClick={() => handleViewArtwork(art)}>
                      View Registration Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "nft" && (
          <div>
            {/* 状态 切换区 */}
            <div className="frame-13">
              {(() => {
                if (statusFilter === "pending") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("pending")}>
                      <div className="text-wrapper-7">
                        Pending NFT ({count.pending})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("pending")}>
                      <div className="text-wrapper-5">
                        Pending Artworks ({count.pending})
                      </div>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (statusFilter === "approved") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("approved")}>
                      <div className="text-wrapper-7">
                        Approved ({count.approved})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("approved")}>
                      <div className="text-wrapper-5">
                        Approved ({count.approved})
                      </div>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (statusFilter === "rejected") {
                  return (
                    <div className="frame-14" onClick={() => setStatusFilter("rejected")}>
                      <div className="text-wrapper-7">
                        Rejected ({count.rejected})
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="frame-15" onClick={() => setStatusFilter("rejected")}>
                      <div className="text-wrapper-5">
                        Rejected ({count.rejected})
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
            {/* 作品列表部分 */}
            <div className="frame-5">
              {filteredArtworks.map((art) => (
                <div className="frame-6" key={art.id}>
                  <div className="frame-7">
                    <img
                      className="rectangle"
                      alt="Rectangle"
                      src="/img/rectangle-5024.png"
                    />

                    <div className="frame-8">
                      <div className="frame-wrapper">
                        <div className="frame-9">
                          <div className="text-wrapper-2">{art.artist}</div>
                          <div className="frame-11-nft">
                            <div className="text-wrapper-3">NFT</div>
                          </div>
                          <div className="untitled-wrapper">
                            <img className="untitled" alt="Untitled" src="/img/untitled-9-1.png" />
                          </div>
                        </div>
                      </div>
                      <div className="text-wrapper-4">Submitted by: {art.submitter}</div>
                    </div>
                  </div>

                  <img className="img" alt="Line" src="/img/line-7-7.svg" />

                  <div className="frame-10">
                    {/* 待审核状态 */}
                    {art.status === "pending" && (
                      <>
                        <div className="frame-11">
                          <div className="frame-12 action-approve">
                            <div className="text-wrapper-5">Approve</div>
                            <img className="arrow" alt="Arrow" src="/img/arrow-1.svg" />
                          </div>
                        </div>
                      </>
                    )}

                    {/* 审核通过 */}
                    {art.status === "approved" && (
                      <div className="frame-11">
                        <div className="frame-12-approved">
                          <div className="text-wrapper-5-approved">Approved</div>
                          <CheckRingDuotone1 />
                        </div>
                      </div>
                    )}

                    {/* 审核拒绝 */}
                    {art.status === "rejected" && (
                      <div className="frame-11">
                        <div className="frame-12-reject">
                          <div className="text-wrapper-5-reject">Rejected</div>
                          <DellFillLight />
                        </div>
                      </div>
                    )}
                    <div className="text-wrapper-6" onClick={() => handleViewNft(art)}>
                      View Registration Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 页面底部保留 */}
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
        <div className="frame-18-test">
          <div className="frame-19-test" onClick={() => setTab("artwork")}>
            <div className="text-wrapper-8">Artwork Registration</div>
            {tab === "artwork" && <div className="rectangle-2" />}
          </div>
          <div className="frame-19-test" onClick={() => setTab("nft")}>
            <div className="text-wrapper-9">Fungible Token Conversion</div>
            {console.log("------test-------")}
            {tab === "nft" && <div className="rectangle-3" />}
          </div>
        </div>


        <img className="line-2" alt="Line" src="/img/line-8.svg" />
        {/* 搜索图标 */}
        <SearchLight className="search-light-instance" />
      </div>
    </div>
  );
};
