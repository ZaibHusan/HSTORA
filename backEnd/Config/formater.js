import { load } from "cheerio";

function extractTikTokData(htmlString) {
    const $ = load(htmlString);

    // Author
    const author = $("#avatarAndTextUsual h2").text().trim();

    // Description / Title
    const description = $(".maintext").text().trim();

    // Thumbnail
    const thumbnail = $(".result_author").attr("src") || "";

    // Video URLs
    const hdNoWatermark = $("#hd_download").attr("data-directurl") || "";

    // SD without watermark (pick the first .download_link without #hd_download)
    const sdNoWatermark = $("a.download_link.without_watermark:not(#hd_download)").attr("href") || "";

    // With watermark — sometimes JS-generated, but try any .dl-button with 'watermark' in href
    const withWatermark = $("a.dl-button[href*='watermark']").attr("href") || "";

    // Music / MP3 URL
    const musicUrl = $(".dl-button.music").attr("href") || "";

    return {
        author,
        description,
        thumbnail,
        video: {
            sd_no_watermark: sdNoWatermark,
            hd_no_watermark: hdNoWatermark,
            with_watermark: withWatermark
        },
        music: musicUrl
    };
}

export default extractTikTokData;
