import { useState } from "react";

import Header from "../../components/Layout/Header/Header";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import AIAssistant from "../../components/AI/AIAssistant";

import Hero from "../../components/ImageScan/Hero";
import UploadZone from "../../components/ImageScan/UploadZone";
import PreviewCard from "../../components/ImageScan/PreviewCard";
import DetectionCard from "../../components/ImageScan/DetectionCard";
import OCRCard from "../../components/ImageScan/OCRCard";
import MetadataCard from "../../components/ImageScan/MetadataCard";
import ThreatIndicators from "../../components/ImageScan/ThreatIndicators";
import RecommendationCard from "../../components/ImageScan/RecommendationCard";
import ThreatTimeline from "../../components/ImageScan/ThreatTimeline";

import bgVideo from "../../assets/videos/upload/Futuristic Blue Particles.mp4";

function ImageScan() {

  const [image, setImage] = useState("");

  const [aiResult, setAiResult] = useState("");

  const [ocrText, setOcrText] = useState("");

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#070B16]">

      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-35"
      >
        <source
          src={bgVideo}
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0 bg-[#050913]/20 backdrop-blur-[1px]" />

      <Header />

      <Sidebar />

      <div
        className="relative transition-all duration-500"
        style={{
          marginLeft: "88px",
        }}
      >

        <main
          className="relative mx-auto max-w-[1500px] px-14 py-12"
          style={{
            paddingRight: "120px",
          }}
        >

          <Hero />
                    <div className="mt-8">

            <UploadZone
              setImage={setImage}
              setAiResult={setAiResult}
              setOcrText={setOcrText}
            />

          </div>

          <div className="mt-8 grid grid-cols-12 gap-6">

            <div className="col-span-7">

              <PreviewCard image={image} />

            </div>

            <div className="col-span-5">

              <DetectionCard result={aiResult} />

            </div>

          </div>

          <div className="mt-8 grid grid-cols-12 gap-6">

            <div className="col-span-7">

              <OCRCard ocrText={ocrText} />

            </div>

            <div className="col-span-5">

              <MetadataCard />

            </div>

          </div>
                    <div className="mt-8 grid grid-cols-12 gap-6">

            <div className="col-span-6">

              <ThreatIndicators />

            </div>

            <div className="col-span-6">

              <RecommendationCard />

            </div>

          </div>

          <div className="mt-8 grid grid-cols-12 gap-6">

            <div className="col-span-8">

              <ThreatTimeline />

            </div>

          </div>

          <div className="h-24" />

        </main>

        <AIAssistant />

      </div>

    </div>

  );

}

export default ImageScan;