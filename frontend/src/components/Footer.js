// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-4">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Fundraiser Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
