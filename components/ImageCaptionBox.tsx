export default function ImageCaptionBox({ imgSrc, caption }: { imgSrc: string, caption: string }) {
    return (
        <div
            className="relative w-full aspect-square bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${imgSrc})`
            }}
        >
            <div className="text-4xl font-bold text-white drop-shadow-lg">{caption}</div>
        </div>
    );
}