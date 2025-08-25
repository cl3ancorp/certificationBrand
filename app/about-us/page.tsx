// data/cleanCorpData.js
const cleanCorpData = {
  header: {
    subtitle: "About Clean Corp Certification",
    title: "Measuring a company's entire social and environmental impact.",
    heroImage: {
      src: "/images/bustling-office-space.jpg",
      alt: "Clean Corp Logo"
    }
  },
  content: {
    mainDescription:
      "Clean Corp Certification is the gold standard for recognizing companies that operate with integrity, transparency, and a commitment to people and planet. Our certification signifies that a business meets rigorous, independent standards of social and environmental responsibility—across everything from ethical sourcing and fair labor to carbon impact and community engagement. To become Clean Corp Certified, a company must:",
    requirements: [
      {
        title: "Demonstrate Verified Impact",
        description:
          "by achieving a high score on the Clean Impact Assessment, which evaluates a company’s environmental footprint, labor practices, supply chain ethics, community engagement, and governance. Companies must also pass a risk and compliance review."
      },
      {
        title: "Make a Legal & Structural Commitment",
        description:
          "by updating their governance structure to be accountable to all stakeholders—employees, communities, and the environment—not just shareholders."
      },
      {
        title: "Commit to Transparency",
        description:
          "by maintaining a public Clean Profile where key performance metrics and impact scores are openly available to customers, partners, and investors."
      }
    ],
    benefitsText:
      "Certified Clean Companies stand at the forefront of a global shift toward ethical and sustainable business. They build trust with conscious consumers and partners, attract mission aligned talent and investors, and gain long term resilience through a culture of continuous improvement. Certification is renewed every three years through a full impact review.",
    processText:
      "Clean Corp Certification takes a holistic view of business ethics not just environmental metrics or labor practices in isolation. The process is rigorous and tailored to company size, industry, and location. It includes documentation of your business model, governance, and work processes, with public feedback review and potential site audits. Ongoing certification ensures continuous commitment.",
    faqLinkText: "FAQs"
  }
};

export default function Page() {
    const { header, content } = cleanCorpData;
    
    return (
        <div className=" bg-white">
            {/* Header Section */}
            <div className="mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto ">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                        {header.subtitle}
                    </h2>
                    <h1 className="mb-7 text-3xl font-bold text-gray-900 leading-tight">
                        {header.title}
                    </h1>
                </div>
                <div className="max-w-[90rem] mx-auto  h-[35rem] rounded-lg overflow-hidden">
                    <img
                        src={header.heroImage.src}
                        alt={header.heroImage.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 bg-white">
                {/* Main Description */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {content.mainDescription}
                </p>

                {/* Requirements List */}
                <ul className="space-y-4 mb-8">
                    {content.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-3 mr-4"></span>
                            <div>
                                <span className="font-semibold text-gray-900">
                                    {requirement.title}
                                </span>
                                <span className="text-gray-700"> {requirement.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {content.benefitsText}
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    {content.processText}{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                        {content.faqLinkText}
                    </span>.
                </p>
            </main>
        </div>
    );
}