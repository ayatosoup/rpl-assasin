let clickCount = 0;
let images = [
    "/images/s1.png",
    "/images/s2.png",
    "/images/s3.png"
];

document.body.style.backgroundImage = "url('" + images[0] + "')";

function changeBackground() {
    clickCount++;
    
    if (clickCount === images.length) {
        window.location.href = "/gameplay"; // Mengarahkan ke halaman gameplay
    } else {
        document.body.style.backgroundImage = "url('" + images[clickCount] + "')";
    }
}
