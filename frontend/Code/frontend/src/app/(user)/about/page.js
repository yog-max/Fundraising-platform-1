// pages/about.js
const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-900">
        About Us
      </h1>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Fundraiser Platform, our mission is to connect passionate
            individuals and organizations with impactful projects that aim to
            make a positive change in our communities and the world. We believe
            in the power of collective effort and are dedicated to providing a
            platform where fundraisers can showcase their initiatives and
            attract support from investors who share their vision.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We envision a world where every innovative idea and meaningful
            project has the resources it needs to thrive. By leveraging
            technology and creating a transparent environment for fundraising,
            we strive to empower creators and investors alike, fostering a
            community of collaboration and mutual support.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            What We Do
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform provides an easy-to-use interface for fundraisers to
            create and manage their campaigns, while investors can discover a
            variety of projects and choose to support those that resonate with
            them. Through our platform, we facilitate connections, ensure
            accountability, and promote a culture of giving and investing in the
            future.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
            <li>
              Transparency: We prioritize clear communication and openness in
              all our operations.
            </li>
            <li>
              Community: We believe in the strength of community and the impact
              of collective action.
            </li>
            <li>
              Integrity: We uphold ethical standards and ensure that every
              campaign is genuine and trustworthy.
            </li>
            <li>
              Empowerment: We strive to empower both fundraisers and investors
              by providing the tools and support they need.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Join Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Whether you are looking to raise funds for a creative project or
            invest in initiatives that align with your values, we welcome you to
            join our platform and become part of our community.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            For any inquiries or to learn more about how to get involved, feel
            free to{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
