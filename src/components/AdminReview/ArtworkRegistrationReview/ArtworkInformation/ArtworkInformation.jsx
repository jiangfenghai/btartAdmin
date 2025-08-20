import { React, useDebugValue, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ImportLight } from "../ImportLight/ImportLight";
import { FolderSearchLight1 } from "../FolderSearchLight1/FolderSearchLight1";
import { useAccount } from "wagmi";
import { ethers } from 'ethers';
import { registerNFTAbi } from "../../../../abi/AssetRegistryNFTAbi";
//import PhoneNumberInput  from  "../../../PhoneNumberInput/PhoneNumberInput"

import PhoneNumberInput from "../../../PhoneNumberInput/PhoneNumberInput";

import "./style.css";
export const ArtworkInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = useAccount();
 const [artwork, setArtwork] = useState({});
  //const artwork = []
  const artworkId = useParams().id;
  const [statusFilter, setStatusFilter] = useState("information");
  const handleViewList = () => {
    navigate("/register");
  };
  useEffect(() => {
    const getArtistWorksById = async () => {
      const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
      const contract = new ethers.Contract(import.meta.env.VITE_APP_REGISTER_CONTRACT_ADDRESS, registerNFTAbi, provider);
      const artWorkInfo = await contract.getArtWorkByTokenId(Number(artworkId))
      setArtwork(artWorkInfo)
      console.log("artworkDeail", artWorkInfo)
      console.log("artwork", artwork)
    }
    getArtistWorksById()
  }, [])
  useEffect(() => {
    console.log("artwork", artwork)
  }, [artwork])
  return (
    <div className="ArtworkInformation">
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
            <div className="frame-6">
              <div className="text-wrapper-3">Artist Name</div>
              <div className="rectangle" />
              <div className="frame-7">
                <div className="text-wrapper-4">{artwork.artist || "N/A"}</div>
              
              </div>
            </div>

            <div className="frame-8">
              <div className="text-wrapper-3">Creation Background</div>
              <div className="rectangle-2" />
              <div className="frame-7">
                <p className="text-wrapper-5">{artwork?.background || "N/A"}</p>
              </div>
            </div>

            <div className="frame-9">
              <div className="text-wrapper-3">Artistic Value</div>
              <div className="rectangle-2" />
              <div className="frame-7">
                {/* <div className="text-wrapper-6">{artwork.artisticValue || "N/A"}</div> */}
                { <div className="text-wrapper-6">{"N/A"}</div> }
              </div>
            </div>

            <div className="frame-10">
              <div className="text-wrapper-3">Awards and Records</div>
              <div className="rectangle-2" />
              <div className="frame-7">
             {/*    <div className="text-wrapper-6">{artwork.awards || "N/A"}</div> */}
              </div>
            </div>

            <div className="frame-11">
              <div className="frame-12">
                <div className="text-wrapper-3">Creation Year</div>
                <div className="rectangle" />
                <div className="frame-7">
                 {/*  <div className="text-wrapper-4">{artwork?.creationYear || "N/A"}</div> */}
                  <div className="text-wrapper-4">{Number(artwork?.creationYear) || "N/A"}</div>
                  {console.log("creationYear",artwork.creationYear)}
                </div>
              </div>

              <div className="frame-12">
                <div className="text-wrapper-3">Medium</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-4">{artwork?.medium || "N/A"}</div>
                </div>
              </div>
            </div>

            <div className="frame-13">
              <div className="frame-12">
                <div className="text-wrapper-3">Material</div>
                <div className="rectangle" />
                <div className="frame-7">
                  <div className="text-wrapper-6">{artwork.material || "N/A"}</div>
                </div>
              </div>

              <div className="frame-12">
                <div className="text-wrapper-3">Dimensions (cm)</div>
                <div className="rectangle" />
                <div className="frame-7">
                  {/*  <div className="text-wrapper-4">{artwork.dimensions || "N/A"}</div> */}
                  <div className="text-wrapper-4">{"N/A"}</div>
                </div>
              </div>
            </div>

            <div className="frame-14">
              <div className="text-wrapper-3">Artwork Title</div>
              <div className="frame-15">
                <div className="rectangle" />
                <div className="frame-16">
                  <div className="text-wrapper-4">{artwork.title || "N/A"}</div>
                </div>
              </div>
            </div>

            <div className="frame-17">
              <div className="text-wrapper-3">Artwork Image</div>
              <div className="frame-18">

                <img
                  className="img"
                  alt="Rectangle"
                  src="/img/rectangle-5041.png"
                />

                <img
                  className="img"
                  alt="Rectangle"
                  src="/img/rectangle-5042.png"
                />

                <FolderSearchLight1 className="folder-search-light-1" />
                <FolderSearchLight1 className="folder-search-light-1-instance" />
                <img
                  className="img"
                  alt="Rectangle"
                  src="/img/rectangle-5043.png"
                />

                <FolderSearchLight1 className="folder-search-light-instance" />
              </div>
            </div>

            <div className="frame-19">
              <div className="text-wrapper-3">Additional Documents</div>
              <div className="frame-wrapper">
                <div className="frame-20">
                  <div className="text-wrapper-7">Download Files</div>
                  <ImportLight className="import-light-instance" />
                </div>
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
            {/* <div className="frame-owenr-3">
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
              </div>PhoneNumberInput
            </div> */}

            <div className="frame-owenr-3">
              <div className="text-wrapper-frame-owenr-3">Telephone Number</div>
              {/*   <div className="frame-15">
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
              </div> */}
              <PhoneNumberInput />
            </div>

          </div>
        )}
        {/* 页面切换 */}
        <div className="frame-21">
          <div
            className="frame-22"
            onClick={() => setStatusFilter("information")}
          >
            <div className="text-wrapper-8">Artwork Information</div>
            {statusFilter === "information" && <div className="rectangle-3" />}
          </div>
          <div
            className="frame-22"
            onClick={() => setStatusFilter("owner")}

          >
            <div className="text-wrapper-9">Owner Information</div>
            {statusFilter === "owner" && <div className="rectangle-4" />}
          </div>
        </div>
        <img className="line-2" alt="Line" src="/img/line-8.svg" />
        {/* 公共页面基本信息显示 */}
        <div className="frame-23">
          <div className="frame-24">
            <img className="rectangle-5" alt="Rectangle" src={artwork.test || "/img/rectangle-5025.png"} />
            {console.log("uris",(artwork.uris))}
            <div className="frame-25">
              <div className="frame-26">
                <div className="text-wrapper-10">{artwork.title} - Register</div>
              </div>
              <div className="frame-27">
                <p className="text-wrapper-11">
                  Creator: {artwork.creator || "N/A"} | Creation Year: {Number(artwork.creationYear) || "N/A"}
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
