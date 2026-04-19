
import Image from "next/image";
import styles from './home.module.css';

const heroHeader = "Consume Consciously";
const heroDescription = "CL3EAN connects conscious consumer to certified business built on shared ID3AIS for a better world.";
const heroTagline = "Making it effortless to support whats right.";

function HeroClean() {
    return (
        <section className="relative w-full py-32 overflow-hidden">

            {/* Subtle radial background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.06)_1px,_transparent_1px)] bg-[size:120px_120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto pl-16 lg:pl-24 pr-6">

                {/* Content Container */}
                <div className="max-w-2xl">

                    {/* Headline */}
                    <h1 className="text-[60px] md:text-[80px] lg:text-[96px] font-bold leading-[0.88] tracking-[-0.03em] text-[#1f4f4f]">
                        Guiding <br />
                        Conscious <br />
                        Consumption
                    </h1>

                    {/* Subtext */}
                    <p className="mt-12 text-[40px]  text-gray-700 leading-[1.6] max-w-[400px]">
                        Making it effortless to support what’s right
                    </p>

                    {/* CTA */}
                    <div className="mt-10 flex items-center gap-8">
                        <a
                            href="/about-us"
                            className="px-5 py-3 bg-gray-200 text-gray-800 rounded-md text-sm font-semibold hover:bg-gray-300 transition"
                        >
                            Learn more about CL3AN
                        </a>

                        <a
                            href="/become-clean-certified"
                            className="text-[#1f4f4f] font-semibold text-sm hover:underline"
                        >
                            Find CL3AN Sources
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default function Home() {
    return <HeroClean />;
}
