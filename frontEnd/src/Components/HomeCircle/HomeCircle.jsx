import React, { useState } from "react";
import { Download, Cpu, Check } from "lucide-react";
import "./HomeCircle.css";

export default function HomeCircle({ isLoading, setIsLoading }) {
    const [Url, setUrl] = useState("");
    const [Error, setError] = useState("");
    const [Step, setStep] = useState(1);
    const [videData, setVideData] = useState({
        author: "",
        description: "",
        thumbnail: "",
        video: { sd_no_watermark: "", music_url: "" },
        tags: [],
    });

    // Step 1 -> fetch video info
    const handleVideoRequest = async (e) => {
        e.preventDefault();
        if (!Url) {
            setError("Please enter a valid URL");
            return;
        }

        try {
            setStep(2); // loading state
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/Tikok/videoRequest`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: Url }),
                }
            );

            const responseJson = await response.json();

            if (!responseJson.success) {
                setError(responseJson.message || "Something went wrong");
                setStep(1);
                return;
            }

            const data = responseJson.output;

            setVideData({
                author: data.author || "",
                description: data.description || "",
                thumbnail: data.thumbnail || "",
                video: {
                    sd_no_watermark: data.video?.sd_no_watermark || "",
                    music_url: data.video?.music_url || "",
                },
                tags: data.tags || [],
            });

            setError("");
            setStep(3); // move to video display
        } catch (err) {
            console.error(err);
            setError("Network or server error");
            setStep(1);
        }
    };

    const handleDownload = async () => {
        if (!videData.video.sd_no_watermark) return;

        try {
            setStep(4); // optional: set loading state

            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/Tikok/videoDownload`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url: videData.video.sd_no_watermark }), // pass video URL
                }
            );

            if (!response.ok) {
                throw new Error("Failed to download video");
            }

            const blob = await response.blob();

            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${videData.author || 'video'} - ${Date.now()}.mp4`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
            setStep(5); // completed
        } catch (err) {
            console.error(err);
            setError("Download failed");
            setStep(3);
        }
    };


    return (
        <div className="HomeCircle">
            {/* Step 1: URL input */}
            {Step === 1 && (
                <div className="Home-step1">
                    <h2 className="hstora-home-title">Paste your TikTok video link</h2>
                    <form onSubmit={handleVideoRequest}>
                        <input
                            onChange={(e) => setUrl(e.target.value)}
                            value={Url}
                            type="url"
                            placeholder="PLACE_TIKTOK_URL"
                        />
                        <hr />
                        <button type="submit">
                            <Download />
                        </button>
                    </form>
                    {Error && <p className="hstora-error">{Error}</p>}
                    <p>Initialize_Task</p>
                </div>
            )}

            {/* Step 2: loading */}
            {Step === 2 && (
                <div className="Home-step2">
                    <Cpu size={16} className="hstora-network-icon cyan" />
                    <span>Initializing Task...</span>
                </div>
            )}

            {/* Step 3: show video info + download button */}
            {(Step === 3 || Step === 4) && (
                <div className="Home-step3">
                    <div className="Tiktok_profile">
                        <img src={videData.thumbnail} alt="thumbnail" />
                    </div>
                    <div className="Tiktok_info">
                        <h2>{videData.author}</h2>
                        <p>{videData.description}</p>
                        {videData.tags.length > 0 && (
                            <p>Tags: {videData.tags.join(", ")}</p>
                        )}
                    </div>

                    {Step === 4 ? (
                        <div>
                            <h1>Processing...</h1>
                            <p>Downloading video</p>
                        </div>
                    ) : (
                        <button onClick={handleDownload}>DOWNLOAD VIDEO HD</button>
                    )}
                </div>
            )}

            {/* Step 5: Completed */}
            {Step === 5 && (
                <div className="Home-step5">
                    <div className="completed">
                        <Check size={32} />
                    </div>
                    <h1>COMPLETE_TASK</h1>
                    <button
                        onClick={() => {
                            setStep(1);
                            setVideData({
                                author: "",
                                description: "",
                                thumbnail: "",
                                video: { sd_no_watermark: "", music_url: "" },
                                tags: [],
                            });
                            setUrl("");
                            setError("");
                        }}
                    >
                        CLEAR_CACHE
                    </button>
                </div>
            )}
        </div>
    );
}
