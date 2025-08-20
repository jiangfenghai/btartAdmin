import React, { useEffect, useMemo, useState } from "react";

import "./style.css";
import { SearchLight } from "../../../../icons/SearchLight/SearchLight";
import { CheckRingDuotone1 } from "../CheckRingDuotone1/CheckRingDuotone1";
import { useNavigate } from "react-router-dom";
import { DellFillLight } from "../DellFillLight/DellFillLight";
import { MyApps } from "../../../MyApps";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { registerNFTAbi } from "../../../../abi/AssetRegistryNFTAbi";

const STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
};

const toNum = (v) => {
  try {
    // ethers v6: BigInt or Hexable -> number
    return Number(v);
  } catch {
    return v;
  }
};

export const Register = () => {
  const [tab, setTab] = useState("artwork");
  const [statusFilter, setStatusFilter] = useState(STATUS.PENDING); // 统一使用数字
  const { address } = useAccount();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAll = async () => {
      if (!address) return;
      setLoading(true);
      setErr("");
      try {
        const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        const contract = new ethers.Contract(
          import.meta.env.VITE_APP_REGISTER_CONTRACT_ADDRESS,
          registerNFTAbi,
          provider
        );
        const all = await contract.getArtistWorks(address);
        console.log("allArtistWorks",all)
        // 归一化字段，保证 verifyStatus / index 为数字
        const normalized = (all || []).map((a) => ({
          ...a,
          verifyStatus: toNum(a?.verifyStatus),
          index: toNum(a?.index),
        }));
        setArtworks(normalized);
      } catch (e) {
        setErr("Failed to load works");
        // 可按需输出 e 以便调试
        // console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getAll();
  }, [address]);

  // 计数统计
  const count = useMemo(() => {
    return {
      pending: artworks.filter((a) => a.verifyStatus === STATUS.PENDING).length,
      approved: artworks.filter((a) => a.verifyStatus === STATUS.APPROVED).length,
      rejected: artworks.filter((a) => a.verifyStatus === STATUS.REJECTED).length,
    };
  }, [artworks]);

  // 过滤列表
  const filteredArtworks = useMemo(() => {
    return artworks.filter((a) => a.verifyStatus === statusFilter);
  }, [artworks, statusFilter]);

  // 跳转
  const handleViewArtwork = (artwork) => {
    navigate(`/register/${artwork.index}` );
  };
  const handleViewNft = (artwork) => {
    navigate(`/nftinfo/${artwork.index}` );
  };

  // 小型 UI 组件（内部函数，不拆分文件）
  const StatusTab = ({ target, label, num }) => {
    const active = statusFilter === target;
    return (
      <div
        className={active ? "frame-14" : "frame-15"}
        onClick={() => setStatusFilter(target)}
      >
        <div className={active ? "text-wrapper-7" : "text-wrapper-5"}>
          {label} ({num})
        </div>
      </div>
    );
  };

  const ArtworkCard = ({ art }) => {
    const key = art.index ?? `${art.submitter}-${art.artist}`;
    return (
      <div className="frame-6" key={key}>
        <div className="frame-7">
          <img className="rectangle" alt="Rectangle" src="/img/rectangle-5024.png" />
          {console.log("uris",art.uris)}
          {console.log("uris",art.uris)}
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
          {art.verifyStatus === STATUS.PENDING && (
            <div className="frame-11">
              <div className="frame-12 action-approve">
                <div className="text-wrapper-5">Approve</div>
                <img className="arrow" alt="Arrow" src="/img/arrow-1.svg" />
              </div>
            </div>
          )}

          {art.verifyStatus === STATUS.APPROVED && (
            <div className="frame-11">
              <div className="frame-12-approved">
                <div className="text-wrapper-5-approved">Approved</div>
                <CheckRingDuotone1 />
              </div>
            </div>
          )}

          {art.verifyStatus === STATUS.REJECTED && (
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
    );
  };

  // 如需启用 NFT tab，可复用此卡片（这里保持与原样式一致）
  const NFTCard = ({ art }) => {
    const key = art.id ?? art.index ?? `${art.submitter}-nft-${art.artist}`;
    return (
      <div className="frame-6" key={key}>
        <div className="frame-7">
          <img className="rectangle" alt="Rectangle" src="/img/rectangle-5024.png" />
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
          {art.status === STATUS.PENDING && (
            <div className="frame-11">
              <div className="frame-12 action-approve">
                <div className="text-wrapper-5">Approve</div>
                <img className="arrow" alt="Arrow" src="/img/arrow-1.svg" />
              </div>
            </div>
          )}

          {art.status === STATUS.APPROVED && (
            <div className="frame-11">
              <div className="frame-12-approved">
                <div className="text-wrapper-5-approved">Approved</div>
                <CheckRingDuotone1 />
              </div>
            </div>
          )}

          {art.status === STATUS.REJECTED && (
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
    );
  };

  return (
    <div className="ArtworkRegister">
      <div className="div">
        <div className="frame">
          <div className="b-tart">BTART</div>
        </div>

        <MyApps isLoginFirst={false} />

        {tab === "artwork" && (
          <div>
            <div className="frame-13">
              <StatusTab target={STATUS.PENDING} label="Pending Artworks" num={count.pending} />
              <StatusTab target={STATUS.APPROVED} label="Approved" num={count.approved} />
              <StatusTab target={STATUS.REJECTED} label="Rejected" num={count.rejected} />
            </div>

            {loading && <div className="text-wrapper-4">Loading...</div>}
            {err && !loading && <div className="text-wrapper-4">{err}</div>}

            <div className="frame-5">
              {!loading && !err && filteredArtworks.map((art) => <ArtworkCard key={art.index} art={art} />)}
            </div>
          </div>
        )}

        {tab === "nft" && (
          <div>
            <div className="frame-13">
              <StatusTab target={STATUS.PENDING} label="Pending NFT" num={count.pending} />
              <StatusTab target={STATUS.APPROVED} label="Approved" num={count.approved} />
              <StatusTab target={STATUS.REJECTED} label="Rejected" num={count.rejected} />
            </div>

            <div className="frame-5">
              {filteredArtworks.map((art) => (
                <NFTCard key={art.id ?? art.index} art={art} />
              ))}
            </div>
          </div>
        )}

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
          {/* 如需开启 NFT 页签，取消下面注释 */}
          
          {/* <div className="frame-19-test" onClick={() => setTab("nft")}>
            <div className="text-wrapper-9">Fungible Token Conversion</div>
            {tab === "nft" && <div className="rectangle-3" />}
          </div> */}
         
        </div>

        <img className="line-2" alt="Line" src="/img/line-8.svg" />
        <SearchLight className="search-light-instance" />
      </div>
    </div>
  );
};