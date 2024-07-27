const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-4">
      <div className="w-full xl:max-w-7xl xl:mx-auto border-t-[3px] border-gray p-6 flex items-center justify-center">
        <p className="font-light text-sm md:text-lg">
          &copy;{year} AfriGems. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
