import axios from "axios";
import fs from "fs";
import extractTikTokData from "../Config/formater.js";


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

        if (!TikokData.video) {
            return res.status(400).json({ message: "URL is invalid" });
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

        res.send(output);


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
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        };

        const VideoData = await axios.get(url, { responseType: 'arraybuffer', headers });
        const pathName = fs.existsSync("/Downloads") ? "/Downloads" : fs.mkdirSync("/Downloads");

        const fileName = `${Date.now()}.mp4`;

        fs.writeFileSync(`${pathName}/${fileName}`, VideoData.data);

        res.download(`${pathName}/${fileName}`, (err) => {
            if (err) {
                console.log(err);
            }
        });



        const Deletingtime = 10;

        setTimeout(() => {
            if (fs.existsSync(`${pathName}/${fileName}`)) {
                fs.unlinkSync(`${pathName}/${fileName}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File deleted successfully");
                });
            }
        }, Deletingtime * 1000);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        })
    }
}