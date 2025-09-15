
import Image from "next/image";
import styles from './home.module.css';
// const imagePath = ''
const crowdImgSrc = `/homepage_gallery/grazing-cow.jpg`;
const coolBoxSrc = "/homepage_gallery/sd-g-thats-a-cool-box@2x.webp";
const microphoneSrc = "/homepage_gallery/girl-holding-bean.webp";
const decalSrc = "/homepage_gallery/b-decal@2x.webp";
const hilariousSrc = "/homepage_gallery/nepalese_kids_laughing.jpg";

const donateTodayButtonStyle = "bg-gray-200 rounded-3xl lg:max-w-max flex flex-col items-center px-4 py-3 font-bold";

const heroHeader = "Consume Consciously";
const heroDescription = "CL3EAN connects conscious consumer to certified business built on shared ID3AIS for a better world.";
const heroTagline = "Making it effortless to support whats right.";
const NoDonationsLabel = "*CLE3AN does not profit or recieve any comission from donations supported by CL3AN.";

function DonationsLabel() {
    return (
        <div className="flex items-center gap-4">
            <div className={donateTodayButtonStyle}>
                {NoDonationsLabel}
            </div>
        </div>
    );
}

function HeroStatsLargeScreen() {
    return (
        <>
            {/*LEFT HERO*/}
            <div className="col-span-6 hidden lg:flex">
                <div className="flex-col-stack-3 mx-auto w-80 ">
                    <h1 data-testid="hero-header " className="text-6xl font-bold my-3">{heroHeader}</h1>
                    <p className="my-4">
                        {heroDescription}
                    </p>
                    <p className="font-bold my-4">{heroTagline}</p>
                    <DonationsLabel />
                </div>
            </div>

            {/* RIGHT GRID GALLERY*/}
            <div className="col-span-6 hidden lg:flex">
                <div className="flex-row-gutter-2">
                    <div className="flex-col-stack-3">
                        <Image
                            alt=""
                            loading="lazy"
                            width={320}
                            height={303}
                            decoding="async"

                            style={{ color: "transparent" }}
                            // srcSet="/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fb-crowd%402x.96ac5714.png&w=384&q=75&dpl=dpl_CFdaBxp1nexZs1AbEVjgfUMFSJ46 1x, /_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fb-crowd%402x.96ac5714.png&w=640&q=75&dpl=dpl_CFdaBxp1nexZs1AbEVjgfUMFSJ46 2x"
                            src={crowdImgSrc}
                        />

                        <div
                            className="flex flex-col items-center py-8 text-white"
                            style={{ backgroundColor: "#008787" }}
                        >
                            <div className="text-4xl font-bold">1,002,035</div>
                            <div className="text-2xl text-center">Workers</div>
                        </div>
                        <Image
                            alt=""
                            loading="lazy"
                            width={321}
                            height={212}
                            decoding="async"

                            style={{ color: "transparent" }}
                            src={coolBoxSrc}
                        />
                    </div>
                    <div className="flex-col-stack-3">
                        <div
                            className="flex flex-col items-center py-8 text-white"
                            style={{
                                backgroundColor: "#ef4044",
                            }}>
                            <div className="text-4xl font-bold">1</div>
                            <div className="text-2xl text-center">Unifying goal</div>
                        </div>
                        <Image
                            alt=""
                            data-nimg="1"
                            decoding="async"
                            height="444"
                            loading="lazy"
                            src={microphoneSrc}
                            style={{
                                color: "transparent",
                            }}
                            width="320"
                        />
                        <div
                            className="flex flex-col items-center py-8 text-white"
                            style={{
                                backgroundColor: "#008787",
                            }}>
                            <div className="text-4xl font-bold">10,000</div>
                            <div className="text-2xl text-center">Companies</div>
                        </div>
                        <div
                            className="flex flex-col items-center py-8 text-white"
                            style={{
                                backgroundColor: "#008787",
                            }}>
                            <div className="text-4xl font-bold">160</div>
                            <div className="text-2xl text-center">Industries</div>
                        </div>

                    </div>
                    <div className="flex-col-stack-3">
                        <Image
                            alt=""
                            data-nimg="1"
                            decoding="async"
                            height="519"
                            loading="lazy"
                            src={decalSrc}
                            style={{
                                color: "transparent",
                            }}
                            width="317"
                        />
                        <div
                            className="flex flex-col items-center py-8 text-white"
                            style={{
                                backgroundColor: "#008787",
                            }}>
                            <div className="text-4xl font-bold">103</div>
                            <div className="text-2xl text-center">Countries</div>
                        </div>
                        <Image
                            alt=""
                            data-nimg="1"
                            decoding="async"
                            height="431"
                            loading="lazy"

                            src={hilariousSrc}
                            style={{
                                color: "transparent",
                            }}
                            width="320"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

function HeroMobile() {
    const SmallStatsGallery = () => (
        <div className="flex md:hidden">
            <div className="flex-row-gutter-3">
                <div className="flex-col-stack-3">
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="303"
                        loading="lazy"
                        src={crowdImgSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="320"
                    />
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">1,002,100</div>
                        <div className="text-2xl text-center">Workers</div>
                    </div>
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">10,004</div>
                        <div className="text-2xl text-center">Companies</div>
                    </div>
                </div>
                <div className="flex-col-stack-3">
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#ef4044",
                        }}>
                        <div className="text-4xl font-bold">1</div>
                        <div className="text-2xl text-center">Unifying goal</div>
                    </div>
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">103</div>
                        <div className="text-2xl text-center">Countries</div>
                    </div>
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">160</div>
                        <div className="text-2xl text-center">Industries</div>
                    </div>
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="444"
                        loading="lazy"
                        src={microphoneSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="320"
                    />
                </div>
            </div>
        </div>

    );

    const MediumStatsGallery = () => (
        <div className="hidden md:flex">
            <div className="flex-row-gutter-3">
                <div className="flex-col-stack-3">
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="303"
                        loading="lazy"
                        src={crowdImgSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="320"
                    />
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">1,002,100</div>
                        <div className="text-2xl text-center">Workers</div>
                    </div>
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="212"
                        loading="lazy"
                        src={coolBoxSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="321"
                    />
                </div>
                <div className="flex-col-stack-3">
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#ef4044",
                        }}>
                        <div className="text-4xl font-bold">1</div>
                        <div className="text-2xl text-center">Unifying goal</div>
                    </div>
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="444"
                        loading="lazy"
                        src={microphoneSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="320"
                    />
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">10,004</div>
                        <div className="text-2xl text-center">Companies</div>
                    </div>
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">160</div>
                        <div className="text-2xl text-center">Industries</div>
                    </div>
                </div>
                <div className="flex-col-stack-3">
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="519"
                        loading="lazy"
                        src={decalSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="317"
                    />
                    <div
                        className="flex flex-col items-center py-8 text-white"
                        style={{
                            backgroundColor: "#008787",
                        }}>
                        <div className="text-4xl font-bold">103</div>
                        <div className="text-2xl text-center">Countries</div>
                    </div>
                    <Image
                        alt=""
                        data-nimg="1"
                        decoding="async"
                        height="431"
                        loading="lazy"
                        src={hilariousSrc}
                        style={{
                            color: "transparent",
                        }}
                        width="320"
                    />
                </div>
            </div>
        </div>

    );

    return (
        <div className="grid grid-cols-6 gap-8 lg:grid-cols-12 col-span-full lg:hidden">
            <h1 className="col-span-full text-center" data-testid="hero-header">
                {heroHeader}
            </h1>
            <div className="flex-col-stack-2 col-span-full">
                <SmallStatsGallery />
                <MediumStatsGallery />

                <div className="my-10">

                    <p className="text-center my-5">
                        {`${heroDescription}
                        We won't stop until every business meets the standard for doing good.`}
                    </p>
                    <p className="text-center font-bold my-5">
                        {heroTagline}
                    </p>
                    <DonationsLabel />
                </div>
            </div>
        </div>

    )
}

export default function Home() {

    return (
        <div className={`${styles.homePage}`}>

            <main className="flex-col-stack-6 container mx-auto max-h-full p-4">
                <div className="grid grid-cols-6 gap-8 lg:grid-cols-12">
                    <HeroStatsLargeScreen />
                    <HeroMobile />
                    <div className="col-span-full flex flex-col items-center">
                        <h2 className="text-3xl font-bold py-10">Learn more about our mission</h2>
                        <div className="m-auto h-full w-4/5">
                            <div className="embed-video">
                                <iframe
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="border-0 w-full h-64 md:h-80 lg:h-96"

                                    src="https://www.youtube.com/embed/8EIgZTdEnFU"
                                    title="Raising the bar: How the B Corp movement is setting a new standard"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>);
}
