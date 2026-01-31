import axios from "axios";
import fs from "fs";
import extractTikTokData from "../Config/formater.js";
import path from "path";


export const videoRequest = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const formData = new URLSearchParams();
        formData.append('id', url);
        formData.append('locale', 'en');
        formData.append('tt', '');

        const response = await axios.post('https://ssstik.io/abc', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });



        const TikokData = extractTikTokData(response.data);

        if (!TikokData.video.sd_no_watermark) {
            return res.send({
                success: false,
                message: "Video not found"
            })
        }

        const output = {
            author: TikokData.author,
            description: TikokData.description,
            thumbnail: TikokData.thumbnail,
            video: {
                sd_no_watermark: TikokData.video.sd_no_watermark,
                music_url: TikokData.video.music_url
            },
            tags: TikokData.tags
        };

        res.send({
            success: true,
            output
        });


    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        })
    }


}







export const videoDownload = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const downloadDir = path.join(process.cwd(), "downloads");

        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }

        const fileName = `${Date.now()}.mp4`;
        const filePath = path.join(downloadDir, fileName);

        const response = await axios.get(url, {
            responseType: "stream",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
            }
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            res.download(filePath, () => {
                setTimeout(() => {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }, 15000);
            });
        });

        writer.on("error", (err) => {
            console.error(err);
            res.status(500).json({ message: "File write failed" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
