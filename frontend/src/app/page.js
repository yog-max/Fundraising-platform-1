const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white text-center py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Empower Your Causes with Our Fundraising Platform
          </h1>
          <p className="text-lg mb-8">
            Raise funds for your projects and make a difference in the world.
          </p>
          <a
            href="/register"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
            aria-label="Get Started"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What We Are About</h2>
          <p className="text-lg mb-4 px-4 md:px-0">
            Our platform connects fundraisers with investors eager to support
            innovative projects.
          </p>
          <p className="text-lg mb-4 px-4 md:px-0">
            With a user-friendly interface and secure payment options, you can
            focus on making a positive impact.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Campaigns",
                description:
                  "Easily set up fundraising campaigns with a clear description, goal amount, and more.",
              },
              {
                title: "Invest in Causes",
                description:
                  "Browse various campaigns and invest in projects that resonate with your values.",
              },
              {
                title: "Secure Payments",
                description:
                  "We utilize secure payment gateways to ensure your transactions are safe and smooth.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          {[
            {
              step: "Step 1: Register",
              description:
                "Create an account as a fundraiser or investor to get started.",
            },
            {
              step: "Step 2: Create or Browse Campaigns",
              description:
                "Fundraisers can create campaigns, while investors can browse and select projects to support.",
            },
            {
              step: "Step 3: Invest and Support",
              description:
                "Invest in the campaigns you believe in and help bring them to life.",
            },
          ].map((item, index) => (
            <div key={index} className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold">{item.step}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {[
              {
                quote:
                  "This platform made fundraising for our charity so easy! Highly recommend!",
                author: "- Sarah K.",
              },
              {
                quote:
                  "A fantastic way to invest in causes I care about. Very transparent and user-friendly!",
                author: "- Mark T.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg max-w-xs mb-4 hover:bg-gray-200 transition-colors duration-300"
              >
                <p>{testimonial.quote}</p>
                <p className="mt-4 font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 text-white text-center py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8">
            Join us today and start your fundraising journey or support projects
            that matter to you.
          </p>
          <a
            href="/login"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green600 transition duration200"
            aria-label="Get Started"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
